describe('Ext.picker.Date', function() {
    var viewport, datePicker;

    function makeDatePicker (value) {
        viewport = Ext.Viewport = new Ext.viewport.Default();

        datePicker = Ext.create('Ext.picker.Date', {
            value: value || null
        });
        viewport.add(datePicker);
    } 
    
    afterEach(function() {
        viewport = datePicker = Ext.destroy(viewport, datePicker);
    });

    describe("create", function() {
        it("should assign an initial value if one was specified in the config", function() {
            var date = new Date();

            makeDatePicker(date);

            datePicker.show();

            expect(datePicker.getValue()).toEqual(Ext.Date.clearTime(date));
        });
    });
});
