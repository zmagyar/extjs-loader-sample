/**
 * @private
 * Handle batch read / write of DOMs, currently used in SizeMonitor + PaintMonitor
 */
Ext.define('Ext.TaskQueue', {
    requires: 'Ext.AnimationQueue',

    singleton: true,

    pending: false,

    mode: true,
    
    readQueue: [],
    writeQueue: [],

    constructor: function() {
        this.run = Ext.Function.bind(this.run, this);
        // iOS has a nasty bug which causes pending requestAnimationFrame to not release
        // the callback when the WebView is switched back and forth from / to being background process
        // We use a watchdog timer to workaround this, and restore the pending state correctly if this happens
        // This timer has to be set as an interval from the very beginning and we have to keep it running for
        // as long as the app lives, setting it later doesn't seem to work
        if (Ext.os.is.iOS) {
            Ext.interval(this.watch, 500, this);
        }
    },

    requestRead: function(fn, scope, args) {
        this.request(true);
        this.readQueue.push(arguments);
    },

    requestWrite: function(fn, scope, args) {
        this.request(false);
        this.writeQueue.push(arguments);
    },

    request: function(mode) {
        var me = this;

        if (!me.pending) {
            me.pendingTime = Date.now();
            me.pending = true;
            me.mode = mode;
            if (mode) {
                me.timer = Ext.defer(me.run, 1, me);
            } else {
                me.timer = Ext.Function.requestAnimationFrame(me.run);
            }
        }
    },

    watch: function() {
        if (this.pending && Date.now() - this.pendingTime >= 500) {
            this.run();
        }
    },

    run: function() {
        this.pending = false;

        var readQueue = this.readQueue,
            writeQueue = this.writeQueue,
            request = null,
            queue;

        if (this.mode) {
            queue = readQueue;

            if (writeQueue.length > 0) {
                request = false;
            }
        }
        else {
            queue = writeQueue;

            if (readQueue.length > 0) {
                request = true;
            }
        }

        var tasks = queue.slice(),
            i, ln, task, fn, scope;

        queue.length = 0;

        for (i = 0, ln = tasks.length; i < ln; i++) {
            task = tasks[i];
            fn = task[0];
            scope = task[1];
            
            if (scope && (scope.destroying || scope.destroyed)) {
                continue;
            }

            if (typeof fn === 'string') {
                fn = scope[fn];
            }

            if (task.length > 2) {
                fn.apply(scope, task[2]);
            }
            else {
                fn.call(scope);
            }
        }

        tasks.length = 0;

        if (request !== null) {
            this.request(request);
        }
    },
    
    clear: function() {
        var me = this;

        me.readQueue.length = me.writeQueue.length = 0;
        clearTimeout(me.timer);
        Ext.Function.cancelAnimationFrame(me.timer);
    }

    //<debug>
    ,privates: {
        flush: function() {
            while (this.readQueue.length || this.writeQueue.length) {
                this.run();
            }
        }
    }
    //</debug>
});
