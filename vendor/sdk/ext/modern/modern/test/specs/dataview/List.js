describe("Ext.dataview.List", function() {
    var component, viewport;

    afterEach(function() {
            tearDown();
        });

    function makeComponent(config, storeData) {
        viewport = Ext.Viewport = new Ext.viewport.Default();
        component = new Ext.dataview.List(Ext.apply({
            itemTpl: '{value}',

            store: new Ext.data.Store({
                data: storeData || [
                    { value: 'foo' },
                    { value: 'bar' }
                ]
            })
        }, config));
        viewport.add(component);
    }

    function tearDown() {
        viewport = component = Ext.destroy(component, Ext.Viewport);
    }
    
    describe('Rendered list with loaded store', function() {
        it('should immediately render records', function() {
            var store = new Ext.data.Store({
                data: [
                    { value: 'foo' },
                    { value: 'bar' }
                ]
            });
            component = new Ext.dataview.List({
                renderTo: Ext.getBody(),
                itemTpl: '<div>{value}</div>',
                store: store
            });

            // Should be two simplelistitems in the List
            expect(component.container.getItems().getCount()).toBe(2);
        });
    });
        

    describe("infinite lists", function() {
        beforeEach(function() {
            makeComponent({
                infinite: true
            });
        });

        it("should set visibleCount to the bodyElement size divided by item minimum height", function() {
            waitsFor(function() {
                return component.visibleCount;
            });

            runs(function(){
                var bodyHeight = component.bodyElement.getHeight(),
                    itemMinimumHeight = component.getItemMap().getMinimumHeight();

                expect(component.visibleCount).toBe(Math.ceil(bodyHeight/itemMinimumHeight));

                // The innerElement gets sized to stretch the scroll region
                expect(component.innerElement.getHeight()).toBe(component.getScrollable().getSize().y);
            });
        });
        
        it("should set visibleCount to a value different than Infinity when store is empty", function() {
            tearDown();
            makeComponent({
                infinite: true
            }, []);

            waitsFor(function() {
                return component.visibleCount != Infinity &&
                        !component.getStore().getCount() &&
                        component.isVisible();
            });
        });
    });
});