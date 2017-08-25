/**
 * This plugin adds pull to refresh functionality to the List.
 *
 * ## Example
 *
 *     @example
 *     var store = Ext.create('Ext.data.Store', {
 *         fields: ['name', 'img', 'text'],
 *         data: [
 *             {
 *                 name: 'rdougan',
 *                 img: 'https://www.sencha.com/forum/images/statusicon/forum_new-48.png',
 *                 text: 'JavaScript development'
 *             }
 *         ]
 *     });
 *
 *     Ext.create('Ext.dataview.List', {
 *         fullscreen: true,
 *
 *         store: store,
 *
 *         plugins: [
 *             {
 *                 xclass: 'Ext.plugin.PullRefresh',
 *                 pullText: 'Pull down for more new Tweets!'
 *             }
 *         ],
 *
 *         itemTpl: [
 *             '<img src="{img}" alt="{name} photo" />',
 *             '<div class="tweet"><b>{name}:</b> {text}</div>'
 *         ]
 *     });
 */
Ext.define('Ext.plugin.PullRefresh', {
    extend: 'Ext.Component',
    alias: 'plugin.pullrefresh',

    baseCls: Ext.baseCSSPrefix + 'pullrefresh',

    config: {
        /**
         * @cfg {Boolean} overlay
         * `false` to move the list down to display the refresh indicator. `true` to float
         * the indicator over the top of the list with no movement.
         *
         * @since 6.2.1
         */
        overlay: false,

        /**
         * @cfg {Boolean} mergeData
         * `true` to insert new records into the store and to replace the data for
         * any incoming records that exist.
         *
         * `false` to completely overwrite store data with the fetched response.
         *
         * @since 6.2.1
         */
        mergeData: true,

        /**
         * @cfg {Ext.dataview.List} list
         * The list to which this PullRefresh plugin is connected.
         * This will usually by set automatically when configuring the list with this plugin.
         * @accessor
         */
        list: null,

        /**
         * @cfg {String} pullText The text that will be shown while you are pulling down.
         * @accessor
         */
        pullText: 'Pull down to refresh...',

        /**
         * @cfg {String} releaseText The text that will be shown after you have pulled down enough to show the release message.
         * @accessor
         */
        releaseText: 'Release to refresh...',

        /**
         * @cfg {String} loadingText The text that will be shown while the list is refreshing.
         * @accessor
         */
        loadingText: 'Loading...',

        /**
         * @cfg {String} loadedText The text that will be when data has been loaded.
         * @accessor
         */
        loadedText: 'Loaded.',

        /**
         * @cfg {String} lastUpdatedText The text to be shown in front of the last updated time.
         * @accessor
         */
        lastUpdatedText: 'Last Updated:&nbsp;',

        /**
         * @cfg {Boolean} autoSnapBack Determines whether the pulldown should automatically snap back after data has been loaded.
         * If false call {@link #snapBack}() to manually snap the pulldown back.
         */
        autoSnapBack: true,

        /**
         * @cfg {Number} snappingAnimationDuration The duration for snapping back animation after the data has been refreshed
         * @accessor
         */
        snappingAnimationDuration: 300,
        /**
         * @cfg {String} lastUpdatedDateFormat The format to be used on the last updated date.
         */
        lastUpdatedDateFormat: 'm/d/Y h:iA',

        /**
         * @cfg {Object} offsets
         * The offsets used when dragging in {@link #cfg-overlay} `true` mode.
         * @cfg {Number/String} offsets.maxPull The maximum distance the refresh indicator
         * can be pulled from the top of the list. If a number, in pixels, or a percentage as a string.
         * @cfg {Number/String} offsets.activate The distance the refresh indicator must be pulled to trigger
         * a refresh. If a number, in pixels, or a percentage as a string.
         * @cfg {Number/String} offsets.loading The distance from the top of the list to display the refresh indicator
         * while a load is taking place. If a number, in pixels, or a percentage as a string.
         * @since 6.2.1
         */
        offsets: {
            maxPull: null,
            activate: null,
            loading: null
        },

        /**
         * @cfg {Ext.XTemplate/String/Array} pullTpl The template being used for the pull to refresh markup.
         * Will be passed a config object with properties state, message and updated
         *
         * @accessor
         */
        pullTpl: [
            '<div class="' + Ext.baseCSSPrefix + 'font-icon ' + Ext.baseCSSPrefix + 'pullrefresh-arrow"></div>',
            '<div class="' + Ext.baseCSSPrefix + 'pullrefresh-loading-wrap">',
                '<div class="' + Ext.baseCSSPrefix + 'pullrefresh-loading ' + Ext.baseCSSPrefix + 'loading-spinner">',
                    '<span class="' + Ext.baseCSSPrefix + 'loading-top"></span>',
                    '<span class="' + Ext.baseCSSPrefix + 'loading-right"></span>',
                    '<span class="' + Ext.baseCSSPrefix + 'loading-bottom"></span>',
                    '<span class="' + Ext.baseCSSPrefix + 'loading-left"></span>',
                '</div>',
            '</div>',
            '<div class="' + Ext.baseCSSPrefix + 'pullrefresh-wrap">',
                '<div class="' + Ext.baseCSSPrefix + 'pullrefresh-message">{message}</div>',
                '<div class="' + Ext.baseCSSPrefix + 'pullrefresh-updated">{updated}</div>',
            '</div>'
        ].join(''),

        translatable: {
            // Use css positioning because we want to use a transform when hiding
            // if we're in overlay mode.
            type: 'cssposition'
        }
    },

    animateOverlayHide: false,
    updateContent: true,
    hidden: true,

    /**
     * @private
     */
    $state: 'pulling',

    /**
     * @private
     */
    setState: function(value) {
        var me = this;

        if (me.$state !== value) {
            me.$state = value;
            if (me.updateContent) {
                me.updateView();
            }
        }
    },

    /**
     * @private
     */
    init: function(list) {
        this.setList(list);
        this.lastUpdated = new Date();
        this.updateView();
    },

    getElementConfig: function() {
        return {
            reference: 'element',
            classList: ['x-unsized']
        };
    },

    /**
     * @private
     */
    applyPullTpl: function(pullTpl) {
        if (pullTpl && !pullTpl.isXTemplate) {
            pullTpl = new Ext.XTemplate(pullTpl);
        }
        return pullTpl;
    },

    /**
     * @private
     */
    updateList: function(list, oldList) {
        var me = this;

        if (oldList) {
            oldList.element.un({
                scope: me,
                touchstart: 'onTouchStart',
                dragstart: 'onDragStart',
                drag: 'onDragMove',
                dragend: 'onDragEnd'
            });
            me.translatable = Ext.destroy(me.translatable);
        }

        if (list) {
            list.element.on({
                scope: me,
                touchstart: 'onTouchStart',
                dragstart: 'onDragStart',
                drag: 'onDragMove',
                dragend: 'onDragEnd'
            });
            list.insert(0, me);
            me.translatable = Ext.Factory.translatable({
                element: list.container.element
            });
        }
    },

    updateOverlay: function(overlay) {
        this.element.toggleCls(Ext.baseCSSPrefix + 'overlay', overlay);
    },

    /**
     * @private
     * Attempts to load the newest posts via the attached List's Store's Proxy
     */
    fetchLatest: function() {
        this.getList().getStore().fetch({
            page: 1,
            start: 0,
            callback: this.onLatestFetched,
            scope: this
        });
    },

    /**
     * @private
     * Called after fetchLatest has finished grabbing data. Matches any returned records against what is already in the
     * Store. If there is an overlap, updates the existing records with the new data and inserts the new items at the
     * front of the Store. If there is no overlap, insert the new records anyway and record that there's a break in the
     * timeline between the new and the old records.
     */
    onLatestFetched: function(newRecords, operation, success) {
        var me = this,
            store = me.getList().getStore(),
            length, toInsert,
            oldRecords, newRecord, oldRecord, i;

        if (success) {
            if (me.getMergeData()) {
                oldRecords = store.getData();
                toInsert = [];
                length = newRecords.length;

                for (i = 0; i < length; i++) {
                    newRecord = newRecords[i];
                    oldRecord = oldRecords.getByKey(newRecord.getId());

                    if (oldRecord) {
                        oldRecord.set(newRecord.getData());
                    } else {
                        toInsert.push(newRecord);
                    }
                }

                store.insert(0, toInsert);
            } else {
                store.loadRecords(newRecords);
            }
        }
        me.setState('loaded');
        me.fireEvent('latestfetched', me, toInsert || newRecords);

        if (me.getAutoSnapBack()) {
            me.snapBack(true);
        }
    },

    /**
     * Snaps the List back to the top after a pullrefresh is complete
     * @param {Boolean} force Force the snapback to occur regardless of state {optional}
     */
    snapBack: function(force, fullNotReached) {
        var me = this,
            duration = me.getSnappingAnimationDuration(),
            translatable = me.translatable;

        if (me.$state !== 'loaded' && force !== true) {
            return;
        }

        if (me.getOverlay()) {
            if (fullNotReached || !me.animateOverlayHide) {
                me.translate(null, -me.getCalculatedPullHeight(), {
                    duration: duration
                });
                translatable.on('animationend', function() {
                    me.onSnapBackEnd(true);
                }, me, {
                    single: true,
                    onFrame: true
                });
            } else {
                me.onSnapBackEnd();
            }
        } else {
            me.translate(null, -me.getCalculatedPullHeight(), {
                duration: duration
            });

            translatable.on('animationend', function() {
                me.onSnapBackEnd();
            }, me, {
                single: true,
                onFrame: true
            });

            translatable.translate(null, 0, {
                duration: duration
            });
        }
    },

    /**
     * @private
     * Called when PullRefresh has been snapped back to the top
     */
    onSnapBackEnd: function(preventAnim) {
        var me = this;
        if (preventAnim) {
            me.hide(null);
            me.setState('pulling');
        } else {
            me.hide();
            me.on('hide', function() {
                me.setState('pulling');
            }, me, {single: true});
        }
    },

    /**
     * @private
     * Updates the content based on the PullRefresh Template
     */
    updateView: function() {
        var me = this,
            map = me.clsMap,
            element = me.element,
            state = me.$state,
            lastUpdatedText = me.getLastUpdatedText() + Ext.util.Format.date(me.lastUpdated, me.getLastUpdatedDateFormat()),
            fn = me.textMap[state];

        element.removeCls([map.loaded, map.loading, map.pulling, map.holding]);
        element.addCls(map[state]);
        me.getPullTpl().overwrite(me.element, {
            state: state, 
            updated: lastUpdatedText,
            message: me[fn]()
        });
    },

    destroy: function() {
        this.setList(null);
        this.callParent();
    },

    privates: {
        clsMap: {
            loaded: Ext.baseCSSPrefix + 'loaded',
            loading: Ext.baseCSSPrefix + 'loading',
            pulling: Ext.baseCSSPrefix + 'pulling',
            holding: Ext.baseCSSPrefix + 'holding'
        },

        textMap: {
            loaded: 'getLoadedText',
            loading: 'getLoadingText',
            pulling: 'getPullText',
            holding: 'getReleaseText'
        },

        calculateSize: function(offset) {
            var h = this.element.getHeight();
            if (this.getOverlay()) {
                h += Math.min(offset, this.getList().element.getHeight());
            }
            return h;
        },

        getActivateOffset: function() {
            return this.getOffset('activate', 0);
        },

        /**
         * @private
         */
        getCalculatedPullHeight: function() {
            return this.calculateSize(this.getMaxPullOffset());
        },

        /**
         * @private
         */
        getCalculatedActivateOffset: function() {
            return this.calculateSize(this.getActivateOffset());
        },

        getLoadingOffset: function() {
            return this.getOffset('loading', 0);
        },

        getMaxPullOffset: function() {
            return this.getOffset('maxPull', 0);
        },

        getOffset: function(key, defaultValue) {
            var offsets = this.getOffsets(),
                value = defaultValue,
                offsetValue;

            if (offsets) {
                offsetValue = offsets[key];
                if (offsetValue || offsetValue === 0) {
                    value = offsetValue;
                    if (typeof value === 'string') {
                        value = parseFloat(value.replace('%', ''));
                        value = this.getList().element.getHeight() * (value / 100);
                    }
                }
            }
            return value;
        },

        onDragStart: function(e) {
            var me = this,
                list = me.getList(),
                dy;

            if (me.running) {
                e.stopEvent();
                return;
            }

            dy = e.deltaY;
            if (list.container.getScrollable().getPosition().y === 0 && dy > 0 && dy > e.deltaX) {
                me.show();
                me.running = true;
                me.translate(null, -me.element.getHeight());
                e.stopEvent();
            }
        },

        onDragMove: function(e) {
            var me = this,
                activateOffset = me.getCalculatedActivateOffset(),
                offset, pullHeight;

            if (me.running) {
                e.stopEvent();
                offset = e.getXY()[1] - me.startY;
                me.setHidden(offset <= 0);
                pullHeight = me.getCalculatedPullHeight();
                if (offset > 0 && offset < pullHeight) {
                    me.setState('pulling');
                    if (me.getOverlay()) {
                        me.translate(null, offset - me.element.getHeight());
                    } else {
                        me.translatable.translate(null, offset);
                        me.translate(null, offset - pullHeight);
                    }
                }

                me.onMove(Math.min(1, offset / activateOffset));

                if (offset >= activateOffset) {
                    me.setState('holding');
                }
            }
        },

        onDragEnd: function() {
            var me = this;

            if (me.running) {
                me.running = false;
                if (me.$state === 'holding') {
                    if (me.getOverlay()) {
                        me.translate(null, me.getLoadingOffset(), {
                            duration: 100
                        });
                    }
                    me.setState('loading');
                    me.fetchLatest();
                } else {
                    me.snapBack(true, true);
                }
            }
        },

        onMove: Ext.privateFn,

        onTouchStart: function(e) {
            this.startY = e.getXY()[1];
        }
    }
});