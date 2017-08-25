/* global expect, Ext */

describe('Ext.field.Text', function() {
    var field,
    create = function(config) {
        field = Ext.create('Ext.field.Text', config || {});
    },
    render = function() {
        field.renderTo(Ext.getBody());
    };

    afterEach(function() {
        if (field) {
            field.destroy();
            field = null;
        }
    });

    describe("events", function() {
        describe("change", function() {
            it("should fire when you change the value from null", function() {
                create();

                var fired = false;

                field.on('change', function() {
                    fired = true;
                }, this);

                field.setValue('test');

                expect(fired).toBeTruthy();
            });

            it("should fire when you change the value", function() {
                create({
                    value: 'test'
                });

                var fired = false;

                field.on('change', function() {
                    fired = true;
                }, this);

                field.setValue('test2');

                expect(fired).toBeTruthy();
            });

            it("should not fire when you change the value", function() {
                create({
                    value: 'test'
                });

                var fired = false;

                field.on('change', function() {
                    fired = true;
                }, this);

                field.setValue('test');

                expect(fired).toBeFalsy();
            });
        });
    });

    describe("configurations", function() {
        describe("name", function() {
            var defaultConfig = {
                name: 'myname'
            };

            describe("configuration", function() {
                it("should add the name attribute to the inputEl", function() {
                    create(defaultConfig);
                    render();
                    expect(field.getComponent().inputElement.getAttribute('name')).toEqual('myname');
                });
            });

            describe("method", function() {
                describe("setting", function() {
                    describe("before render", function() {
                        it("should add the name attribute to the inputEl", function() {
                            create();
                            field.setName('myname');
                            render();
                            expect(field.getComponent().inputElement.getAttribute('name')).toEqual('myname');
                        });
                    });

                    describe("after render", function() {
                        it("should add the name attribute to the inputEl", function() {
                            create();
                            render();
                            field.setName('myname');
                            expect(field.getComponent().inputElement.getAttribute('name')).toEqual('myname');
                        });
                    });
                });


                describe("removing", function() {
                    describe("before render", function() {
                        it("should remove the name attribute from the inputEl", function() {
                            create(defaultConfig);
                            field.setName(null);
                            render();
                            expect(field.getComponent().inputElement.getAttribute('name')).toBeNull();
                        });

                    });

                    describe("after render", function() {
                        it("should remove the name attribute from the inputEl", function() {
                            create(defaultConfig);
                            render();
                            field.setName(null);
                            expect(field.getComponent().inputElement.getAttribute('name')).toBeNull();
                        });

                    });
                });
            });
        });

        describe("tabIndex", function() {
           var defaultConfig = {
               tabIndex: 10
           };

           describe("configuration", function() {
                it("should add the tabindex attribute to the inputEl", function() {
                    create(defaultConfig);
                    render();
                    expect(field.getComponent().inputElement.getAttribute('tabindex')).toEqual('10');
                });
            });

            describe("method", function() {
                describe("setting", function() {
                    describe("before render", function() {
                        it("should add the tabindex attribute to the inputEl", function() {
                            create();
                            field.setTabIndex(10);
                            render();
                            expect(field.getComponent().inputElement.getAttribute('tabindex')).toEqual('10');
                        });
                    });

                    describe("after render", function() {
                        it("should add the tabindex attribute to the inputEl", function() {
                            create();
                            render();
                            field.setTabIndex(10);
                            expect(field.getComponent().inputElement.getAttribute('tabindex')).toEqual('10');
                        });
                    });
                });


                describe("removing", function() {
                    describe("before render", function() {
                        it("should remove the tabindex attribute from the inputEl", function() {
                            create(defaultConfig);
                            field.setTabIndex(null);
                            render();
                            waits(10);
                            runs(function() {
                                expect(field.getComponent().inputElement.getAttribute('tabindex')).toBeNull();
                            });
                        });

                    });

                    describe("after render", function() {
                        it("should remove the tabindex attribute from the inputEl", function() {
                            create(defaultConfig);
                            render();
                            field.setTabIndex(null);

                            expect(field.getComponent().inputElement.getAttribute('tabindex')).toBeNull();
                        });

                    });

                });

            });

        });

        describe("maxLength", function() {
            var defaultConfig = {
                maxLength: 10
            };

            describe("configuration", function() {
                it("should add the maxlength attribute to the inputEl", function() {
                    create(defaultConfig);
                    render();
                    expect(field.getComponent().inputElement.getAttribute('maxlength')).toEqual('10');
                });
            });

            describe("method", function() {
                describe("setting", function() {
                    describe("before render", function() {
                        it("should add the maxlength attribute to the inputEl", function() {
                            create();
                            field.setMaxLength(10);
                            render();
                            expect(field.getComponent().inputElement.getAttribute('maxlength')).toEqual('10');
                        });
                    });

                    describe("after render", function() {
                        it("should add the maxlength attribute to the inputEl", function() {
                            create();
                            render();
                            field.setMaxLength(10);
                            expect(field.getComponent().inputElement.getAttribute('maxlength')).toEqual('10');
                        });
                    });
                });


                describe("removing", function() {
                    describe("before render", function() {
                        it("should remove the maxlength attribute from the inputEl", function() {
                            create(defaultConfig);
                            field.setMaxLength(null);
                            render();
                            expect(field.getComponent().inputElement.getAttribute('maxlength')).toBeNull();
                        });
                    });

                    describe("after render", function() {
                        it("should remove the maxlength attribute from the inputEl", function() {
                            create(defaultConfig);
                            render();
                            field.setMaxLength(null);
                            expect(field.getComponent().inputElement.getAttribute('maxlength')).toBeNull();
                        });
                    });

                });

            });
        });

        describe("placeHolder", function() {
            var defaultConfig = {
                placeHolder: 'testing'
            };

            describe("configuration", function() {
                it("should add the placeholder attribute to the inputEl", function() {
                    create(defaultConfig);
                    render();
                    expect(field.getComponent().inputElement.getAttribute('placeholder')).toEqual('testing');
                });
            });

            describe("method", function() {
                describe("setting", function() {
                    describe("before render", function() {
                        it("should add the placeholder attribute to the inputEl", function() {
                            create();
                            field.setPlaceHolder('testing');
                            render();
                            expect(field.getComponent().inputElement.getAttribute('placeholder')).toEqual('testing');
                        });
                    });

                    describe("after render", function() {
                        it("should add the placeholder attribute to the inputEl", function() {
                            create();
                            render();
                            field.setPlaceHolder('testing');
                            expect(field.getComponent().inputElement.getAttribute('placeholder')).toEqual('testing');
                        });
                    });
                });


                describe("removing", function() {
                    describe("before render", function() {
                        it("should remove the placeholder attribute from the inputEl", function() {
                            create(defaultConfig);
                            field.setPlaceHolder(null);
                            render();
                            expect(field.getComponent().inputElement.getAttribute('placeholder')).toBeNull();
                        });

                    });

                    describe("after render", function() {
                        it("should remove the placeholder attribute from the inputEl", function() {
                            create(defaultConfig);
                            render();
                            field.setPlaceHolder(null);
                            expect(field.getComponent().inputElement.getAttribute('placeholder')).toBeNull();
                        });
                    });
                });
            });
        });

        describe("labelAlign", function() {
            describe("placeholder", function() {
                describe("without initial value", function() {
                    var defaultConfig = {
                        labelAlign: 'placeholder',
                        label: 'foo'

                    };

                    beforeEach(function() {
                        create(defaultConfig);
                        render();
                    });

                    it("should set the label as placeholder", function() {
                        expect(field.getPlaceHolder()).toBe('foo');
                    });

                    it("should hide the label initially", function() {
                        expect(field.labelElement.getStyle('opacity')).toBe('0');
                    });

                    it("should display the label if a value is set", function() {
                        field.setValue('test');
                        waitsFor(function() {
                            return field.labelElement.getStyle('opacity') === '1';
                        }, 2000);

                        runs(function() {
                            expect(field.labelTextElement.dom.innerHTML).toBe('foo');
                        });
                    });
                });

                describe("with initial value", function() {
                    var defaultConfig = {
                        labelAlign: 'placeholder',
                        label: 'foo',
                        value: 'bar'

                    };

                    beforeEach(function() {
                        create(defaultConfig);
                        render();
                    });
                    

                    it("should not hide the label initially", function() {
                        expect(field.labelElement.getStyle('opacity')).toBe('1');
                    });

                    it("should hide the label and set the label as placeholder when clearing the field's value", function() {
                        field.setValue(null);
                        waitsFor(function() {
                            return  field.getPlaceHolder() === 'foo';
                        }, 2000);
                        runs(function() {
                            expect(field.labelElement.getStyle('opacity')).toBe('0');
                        });
                    });
                });
            });
        });

        describe("autoComplete", function() {
            describe("using value 'on'", function() {
                var defaultConfig = {
                    autoComplete: 'on'
                };

                describe("configuration", function() {
                    it("should add the autocomplete attribute to the inputEl", function() {
                        create(defaultConfig);
                        render();
                        expect(field.getComponent().inputElement.getAttribute('autocomplete')).toEqual('on');
                    });
                });

                describe("method", function() {
                    describe("setting", function() {
                        describe("before render", function() {
                            it("should add the autocomplete attribute to the inputEl", function() {
                                create();
                                field.setAutoComplete('on');
                                render();
                                expect(field.getComponent().inputElement.getAttribute('autocomplete')).toEqual('on');
                            });
                        });

                        describe("after render", function() {
                            it("should add the autocomplete attribute to the inputEl", function() {
                                create();
                                render();
                                field.setAutoComplete('on');
                                expect(field.getComponent().inputElement.getAttribute('autocomplete')).toEqual('on');
                            });
                        });
                    });


                    describe("removing", function() {
                        describe("before render", function() {
                            it("should remove the autocomplete attribute from the inputEl", function() {
                                create(defaultConfig);
                                field.setAutoComplete(null);
                                render();
                                expect(field.getComponent().inputElement.getAttribute('autocomplete')).toBe('off');
                            });

                        });

                        describe("after render", function() {
                            it("should remove the autocomplete attribute from the inputEl", function() {
                                create(defaultConfig);
                                render();
                                field.setAutoComplete(null);
                                expect(field.getComponent().inputElement.getAttribute('autocomplete')).toBe('off');
                            });
                        });
                    });
                });
            });

            describe("using value true", function() {
                var defaultConfig = {
                    autoComplete: true
                };

                describe("configuration", function() {
                    it("should add the autocomplete attribute to the inputEl", function() {
                        create(defaultConfig);
                        render();
                        expect(field.getComponent().inputElement.getAttribute('autocomplete')).toEqual('on');
                    });
                });

                describe("method", function() {
                    describe("setting", function() {
                        describe("before render", function() {
                            it("should add the autocomplete attribute to the inputEl", function() {
                                create();
                                field.setAutoComplete(true);
                                render();
                                expect(field.getComponent().inputElement.getAttribute('autocomplete')).toEqual('on');
                            });
                        });

                        describe("after render", function() {
                            it("should add the autocomplete attribute to the inputEl", function() {
                                create();
                                render();
                                field.setAutoComplete(true);
                                expect(field.getComponent().inputElement.getAttribute('autocomplete')).toEqual('on');
                            });
                        });
                    });


                    describe("removing", function() {
                        describe("before render", function() {
                            it("should remove the autocomplete attribute from the inputEl", function() {
                                create(defaultConfig);
                                field.setAutoComplete(null);
                                render();
                                expect(field.getComponent().inputElement.getAttribute('autocomplete')).toBe('off');
                            });

                        });

                        describe("after render", function() {
                            it("should remove the autocomplete attribute from the inputEl", function() {
                                create(defaultConfig);
                                render();
                                field.setAutoComplete(null);
                                expect(field.getComponent().inputElement.getAttribute('autocomplete')).toBe('off');
                            });
                        });
                    });
                });
            });

            describe("using value 'off'", function() {
                var defaultConfig = {
                    autoComplete: 'off'
                };

                describe("configuration", function() {
                    it("should add the autocomplete attribute to the inputEl", function() {
                        create(defaultConfig);
                        render();
                        expect(field.getComponent().inputElement.getAttribute('autocomplete')).toEqual('off');
                    });
                });

                describe("method", function() {
                    describe("setting", function() {
                        describe("before render", function() {
                            it("should add the autocomplete attribute to the inputEl", function() {
                                create();
                                field.setAutoComplete('off');
                                render();
                                expect(field.getComponent().inputElement.getAttribute('autocomplete')).toEqual('off');
                            });
                        });
                        describe("after render", function() {
                            it("should add the autocomplete attribute to the inputEl", function() {
                                create();
                                render();
                                field.setAutoComplete('off');
                                expect(field.getComponent().inputElement.getAttribute('autocomplete')).toEqual('off');
                            });
                        });
                    });
                    describe("removing", function() {
                        describe("before render", function() {
                            it("should remove the autocomplete attribute from the inputEl", function() {
                                create(defaultConfig);
                                field.setAutoComplete(null);
                                render();
                                expect(field.getComponent().inputElement.getAttribute('autocomplete')).toBe('off');
                            });

                        });
                        describe("after render", function() {
                            it("should remove the autocomplete attribute from the inputEl", function() {
                                create(defaultConfig);
                                render();
                                field.setAutoComplete(null);
                                expect(field.getComponent().inputElement.getAttribute('autocomplete')).toBe('off');
                            });
                        });
                    });
                });
            });

            describe("using value false", function() {
                var defaultConfig = {
                    autoComplete: false
                };

                describe("configuration", function() {
                    it("should add the autocomplete attribute to the inputEl", function() {
                        create(defaultConfig);
                        render();
                        expect(field.getComponent().inputElement.getAttribute('autocomplete')).toEqual('off');
                    });
                });

                describe("method", function() {
                    describe("setting", function() {
                        describe("before render", function() {
                            it("should add the autocomplete attribute to the inputEl", function() {
                                create();
                                field.setAutoComplete(false);
                                render();
                                expect(field.getComponent().inputElement.getAttribute('autocomplete')).toEqual('off');
                            });
                        });

                        describe("after render", function() {
                            it("should add the autocomplete attribute to the inputEl", function() {
                                create();
                                render();
                                field.setAutoComplete(false);
                                expect(field.getComponent().inputElement.getAttribute('autocomplete')).toEqual('off');
                            });
                        });
                    });


                    describe("removing", function() {
                        describe("before render", function() {
                            it("should remove the autocomplete attribute from the inputEl", function() {
                                create(defaultConfig);
                                field.setAutoComplete(null);
                                render();
                                expect(field.getComponent().inputElement.getAttribute('autocomplete')).toBe('off');
                            });

                        });

                        describe("after render", function() {
                            it("should remove the autocomplete attribute from the inputEl", function() {
                                create(defaultConfig);
                                render();
                                field.setAutoComplete(null);
                                expect(field.getComponent().inputElement.getAttribute('autocomplete')).toBe('off');
                            });
                        });
                    });
                });
            });
        });

        describe("autoCapitalize", function() {
            describe("using value 'on'", function() {
                var defaultConfig = {
                    autoCapitalize: 'on'
                };

                describe("configuration", function() {
                    it("should add the autocapitalize attribute to the inputEl", function() {
                        create(defaultConfig);
                        render();
                        expect(field.getComponent().inputElement.getAttribute('autocapitalize')).toEqual('on');
                    });
                });

                describe("method", function() {
                    describe("setting", function() {
                        describe("before render", function() {
                            it("should add the autocapitalize attribute to the inputEl", function() {
                                create();
                                field.setAutoCapitalize('on');
                                render();
                                expect(field.getComponent().inputElement.getAttribute('autocapitalize')).toEqual('on');
                            });
                        });

                        describe("after render", function() {
                            it("should add the autocapitalize attribute to the inputEl", function() {
                                create();
                                render();
                                field.setAutoCapitalize('on');
                                expect(field.getComponent().inputElement.getAttribute('autocapitalize')).toEqual('on');
                            });
                        });
                    });


                    describe("removing", function() {
                        describe("before render", function() {
                            it("should remove the autocapitalize attribute from the inputEl", function() {
                                create(defaultConfig);
                                field.setAutoCapitalize(null);
                                render();
                                expect(field.getComponent().inputElement.getAttribute('autocapitalize')).toBe('off');
                            });

                        });

                        describe("after render", function() {
                            it("should remove the autocapitalize attribute from the inputEl", function() {
                                create(defaultConfig);
                                render();
                                field.setAutoCapitalize(null);
                                expect(field.getComponent().inputElement.getAttribute('autocapitalize')).toBe('off');
                            });
                        });
                    });
                });
            });

            describe("using value true", function() {
                var defaultConfig = {
                    autoCapitalize: true
                };

                describe("configuration", function() {
                    it("should add the autocapitalize attribute to the inputEl", function() {
                        create(defaultConfig);
                        render();
                        expect(field.getComponent().inputElement.getAttribute('autocapitalize')).toEqual('on');
                    });
                });

                describe("method", function() {
                    describe("setting", function() {
                        describe("before render", function() {
                            it("should add the autocapitalize attribute to the inputEl", function() {
                                create();
                                field.setAutoCapitalize(true);
                                render();
                                expect(field.getComponent().inputElement.getAttribute('autocapitalize')).toEqual('on');
                            });
                        });

                        describe("after render", function() {
                            it("should add the autocapitalize attribute to the inputEl", function() {
                                create();
                                render();
                                field.setAutoCapitalize(true);
                                expect(field.getComponent().inputElement.getAttribute('autocapitalize')).toEqual('on');
                            });
                        });
                    });


                    describe("removing", function() {
                        describe("before render", function() {
                            it("should remove the autocapitalize attribute from the inputEl", function() {
                                create(defaultConfig);
                                field.setAutoCapitalize(null);
                                render();
                                expect(field.getComponent().inputElement.getAttribute('autocapitalize')).toBe('off');
                            });

                        });

                        describe("after render", function() {
                            it("should remove the autocapitalize attribute from the inputEl", function() {
                                create(defaultConfig);
                                render();
                                field.setAutoCapitalize(null);
                                expect(field.getComponent().inputElement.getAttribute('autocapitalize')).toBe('off');
                            });
                        });
                    });
                });
            });

            describe("using value 'off'", function() {
                var defaultConfig = {
                    autoCapitalize: 'off'
                };

                describe("configuration", function() {
                    it("should add the autocapitalize attribute to the inputEl", function() {
                        create(defaultConfig);
                        render();
                        expect(field.getComponent().inputElement.getAttribute('autocapitalize')).toEqual('off');
                    });
                });

                describe("method", function() {
                    describe("setting", function() {
                        describe("before render", function() {
                            it("should add the autocapitalize attribute to the inputEl", function() {
                                create();
                                field.setAutoCapitalize('off');
                                render();
                                expect(field.getComponent().inputElement.getAttribute('autocapitalize')).toEqual('off');
                            });
                        });
                        describe("after render", function() {
                            it("should add the autocapitalize attribute to the inputEl", function() {
                                create();
                                render();
                                field.setAutoCapitalize('off');
                                expect(field.getComponent().inputElement.getAttribute('autocapitalize')).toEqual('off');
                            });
                        });
                    });
                    describe("removing", function() {
                        describe("before render", function() {
                            it("should remove the autocapitalize attribute from the inputEl", function() {
                                create(defaultConfig);
                                field.setAutoCapitalize(null);
                                render();
                                expect(field.getComponent().inputElement.getAttribute('autocapitalize')).toBe('off');
                            });

                        });
                        describe("after render", function() {
                            it("should remove the autocapitalize attribute from the inputEl", function() {
                                create(defaultConfig);
                                render();
                                field.setAutoCapitalize(null);
                                expect(field.getComponent().inputElement.getAttribute('autocapitalize')).toBe('off');
                            });
                        });
                    });
                });
            });

            describe("using value false", function() {
                var defaultConfig = {
                    autoCapitalize: false
                };

                describe("configuration", function() {
                    it("should add the autocapitalize attribute to the inputEl", function() {
                        create(defaultConfig);
                        render();
                        expect(field.getComponent().inputElement.getAttribute('autocapitalize')).toEqual('off');
                    });
                });

                describe("method", function() {
                    describe("setting", function() {
                        describe("before render", function() {
                            it("should add the autocapitalize attribute to the inputEl", function() {
                                create();
                                field.setAutoCapitalize(false);
                                render();
                                expect(field.getComponent().inputElement.getAttribute('autocapitalize')).toEqual('off');
                            });
                        });

                        describe("after render", function() {
                            it("should add the autocapitalize attribute to the inputEl", function() {
                                create();
                                render();
                                field.setAutoCapitalize(false);
                                expect(field.getComponent().inputElement.getAttribute('autocapitalize')).toEqual('off');
                            });
                        });
                    });


                    describe("removing", function() {
                        describe("before render", function() {
                            it("should remove the autocapitalize attribute from the inputEl", function() {
                                create(defaultConfig);
                                field.setAutoCapitalize(null);
                                render();
                                expect(field.getComponent().inputElement.getAttribute('autocapitalize')).toBe('off');
                            });

                        });

                        describe("after render", function() {
                            it("should remove the autocapitalize attribute from the inputEl", function() {
                                create(defaultConfig);
                                render();
                                field.setAutoCapitalize(null);
                                expect(field.getComponent().inputElement.getAttribute('autocapitalize')).toBe('off');
                            });
                        });
                    });
                });
            });
        });


        describe("autoCorrect", function() {
            describe("using value 'on'", function() {
                var defaultConfig = {
                    autoCorrect: 'on'
                };

                describe("configuration", function() {
                    it("should add the autocorrect attribute to the inputEl", function() {
                        create(defaultConfig);
                        render();
                        expect(field.getComponent().inputElement.getAttribute('autocorrect')).toEqual('on');
                    });
                });

                describe("method", function() {
                    describe("setting", function() {
                        describe("before render", function() {
                            it("should add the autocorrect attribute to the inputEl", function() {
                                create();
                                field.setAutoCorrect('on');
                                render();
                                expect(field.getComponent().inputElement.getAttribute('autocorrect')).toEqual('on');
                            });
                        });

                        describe("after render", function() {
                            it("should add the autocorrect attribute to the inputEl", function() {
                                create();
                                render();
                                field.setAutoCorrect('on');
                                expect(field.getComponent().inputElement.getAttribute('autocorrect')).toEqual('on');
                            });
                        });
                    });


                    describe("removing", function() {
                        describe("before render", function() {
                            it("should remove the autocorrect attribute from the inputEl", function() {
                                create(defaultConfig);
                                field.setAutoCorrect(null);
                                render();
                                expect(field.getComponent().inputElement.getAttribute('autocorrect')).toBe('off');
                            });

                        });

                        describe("after render", function() {
                            it("should remove the autocorrect attribute from the inputEl", function() {
                                create(defaultConfig);
                                render();
                                field.setAutoCorrect(null);
                                expect(field.getComponent().inputElement.getAttribute('autocorrect')).toBe('off');
                            });
                        });
                    });
                });
            });

            describe("using value true", function() {
                var defaultConfig = {
                    autoCorrect: true
                };

                describe("configuration", function() {
                    it("should add the autocorrect attribute to the inputEl", function() {
                        create(defaultConfig);
                        render();
                        expect(field.getComponent().inputElement.getAttribute('autocorrect')).toEqual('on');
                    });
                });

                describe("method", function() {
                    describe("setting", function() {
                        describe("before render", function() {
                            it("should add the autocorrect attribute to the inputEl", function() {
                                create();
                                field.setAutoCorrect(true);
                                render();
                                expect(field.getComponent().inputElement.getAttribute('autocorrect')).toEqual('on');
                            });
                        });

                        describe("after render", function() {
                            it("should add the autocorrect attribute to the inputEl", function() {
                                create();
                                render();
                                field.setAutoCorrect(true);
                                expect(field.getComponent().inputElement.getAttribute('autocorrect')).toEqual('on');
                            });
                        });
                    });


                    describe("removing", function() {
                        describe("before render", function() {
                            it("should remove the autocorrect attribute from the inputEl", function() {
                                create(defaultConfig);
                                field.setAutoCorrect(null);
                                render();
                                expect(field.getComponent().inputElement.getAttribute('autocorrect')).toBe('off');
                            });

                        });

                        describe("after render", function() {
                            it("should remove the autocorrect attribute from the inputEl", function() {
                                create(defaultConfig);
                                render();
                                field.setAutoCorrect(null);
                                expect(field.getComponent().inputElement.getAttribute('autocorrect')).toBe('off');
                            });
                        });
                    });
                });
            });

            describe("using value 'off'", function() {
                var defaultConfig = {
                    autoCorrect: 'off'
                };

                describe("configuration", function() {
                    it("should add the autocorrect attribute to the inputEl", function() {
                        create(defaultConfig);
                        render();
                        expect(field.getComponent().inputElement.getAttribute('autocorrect')).toEqual('off');
                    });
                });

                describe("method", function() {
                    describe("setting", function() {
                        describe("before render", function() {
                            it("should add the autocorrect attribute to the inputEl", function() {
                                create();
                                field.setAutoCorrect('off');
                                render();
                                expect(field.getComponent().inputElement.getAttribute('autocorrect')).toEqual('off');
                            });
                        });
                        describe("after render", function() {
                            it("should add the autocorrect attribute to the inputEl", function() {
                                create();
                                render();
                                field.setAutoCorrect('off');
                                expect(field.getComponent().inputElement.getAttribute('autocorrect')).toEqual('off');
                            });
                        });
                    });
                    describe("removing", function() {
                        describe("before render", function() {
                            it("should remove the autocorrect attribute from the inputEl", function() {
                                create(defaultConfig);
                                field.setAutoCorrect(null);
                                render();
                                expect(field.getComponent().inputElement.getAttribute('autocorrect')).toBe('off');
                            });

                        });
                        describe("after render", function() {
                            it("should remove the autocorrect attribute from the inputEl", function() {
                                create(defaultConfig);
                                render();
                                field.setAutoCorrect(null);
                                expect(field.getComponent().inputElement.getAttribute('autocorrect')).toBe('off');
                            });
                        });
                    });
                });
            });

            describe("using value false", function() {
                var defaultConfig = {
                    autoCorrect: false
                };

                describe("configuration", function() {
                    it("should add the autocorrect attribute to the inputEl", function() {
                        create(defaultConfig);
                        render();
                        expect(field.getComponent().inputElement.getAttribute('autocorrect')).toEqual('off');
                    });
                });

                describe("method", function() {
                    describe("setting", function() {
                        describe("before render", function() {
                            it("should add the autocorrect attribute to the inputEl", function() {
                                create();
                                field.setAutoCorrect(false);
                                render();
                                expect(field.getComponent().inputElement.getAttribute('autocorrect')).toEqual('off');
                            });
                        });

                        describe("after render", function() {
                            it("should add the autocorrect attribute to the inputEl", function() {
                                create();
                                render();
                                field.setAutoCorrect(false);
                                expect(field.getComponent().inputElement.getAttribute('autocorrect')).toEqual('off');
                            });
                        });
                    });


                    describe("removing", function() {
                        describe("before render", function() {
                            it("should remove the autocorrect attribute from the inputEl", function() {
                                create(defaultConfig);
                                field.setAutoCorrect(null);
                                render();
                                expect(field.getComponent().inputElement.getAttribute('autocorrect')).toBe('off');
                            });

                        });

                        describe("after render", function() {
                            it("should remove the autocorrect attribute from the inputEl", function() {
                                create(defaultConfig);
                                render();
                                field.setAutoCorrect(null);
                                expect(field.getComponent().inputElement.getAttribute('autocorrect')).toBe('off');
                            });
                        });
                    });
                });
            });
        });
    });

    describe("methods", function() {
        describe("reset", function() {
            beforeEach(function () {
                create({
                    value: 'foo'
                });
                render();
                field.setValue('foobar');
            });

            it("should update the input field element", function () {
                field.reset();

                expect(field.getComponent().inputElement.dom.value).toBe('foo');
            });

            it("should synchronize the value of the component with the field", function () {
                field.reset();

                expect(field.getValue()).toBe('foo');
                expect(field.getComponent().getValue()).toBe('foo');
            });
        });
    });

    describe("triggers", function() {
        var triggers;

        function makeField(cfg) {
            field = Ext.create(Ext.merge({
                xtype: 'textfield',
                renderTo: document.body
            }, cfg));

            triggers = field.getTriggers();
        }

        it("should initialize with triggers", function() {
            makeField({
                triggers: {
                    foo: {
                        cls: 'foo'
                    },
                    bar: {
                        cls: 'bar'
                    }
                }
            });

            expect(Object.keys(triggers).length).toBe(3); // including clear trigger

            expect(triggers.foo instanceof Ext.field.trigger.Trigger).toBe(true);
            expect(triggers.foo.element).toHaveCls('foo');
            expect(triggers.bar instanceof Ext.field.trigger.Trigger).toBe(true);
            expect(triggers.bar.element).toHaveCls('bar');
        });

        it("should have a clear trigger", function() {
            makeField();

            expect(Object.keys(triggers).length).toBe(1);
            expect(triggers.clear instanceof Ext.field.trigger.Clear).toBe(true);
        });

        it("should not have a clear trigger if clearIcon is false", function() {
            makeField({
                clearIcon: false
            });

            expect(Object.keys(triggers).length).toBe(0);
        });

        it("should add a clear trigger when clearIcon is set to true after instantiation", function() {
            makeField({
                clearIcon: false
            });

            field.setClearIcon(true);

            expect(Object.keys(triggers).length).toBe(1);
            expect(triggers.clear instanceof Ext.field.trigger.Clear).toBe(true);
        });

        it("should remove the clear trigger when clearIcon is set to false after instantiation", function() {
            makeField();

            var clearTrigger = triggers.clear;

            field.setClearIcon(false);

            expect(Object.keys(triggers).length).toBe(0);
            expect(clearTrigger.destroyed).toBe(true);
        });

        it("should add a trigger using a config object", function() {
            makeField({
                triggers: {
                    foo: {
                        cls: 'foo'
                    }
                }
            });

            field.addTrigger('bar', {
                cls: 'bar'
            });

            expect(triggers.foo instanceof Ext.field.trigger.Trigger).toBe(true);
            expect(triggers.foo.element).toHaveCls('foo');
            expect(triggers.bar instanceof Ext.field.trigger.Trigger).toBe(true);
            expect(triggers.bar.element).toHaveCls('bar');
        });

        it("should add a trigger by type", function() {
            makeField({
                triggers: {
                    foo: {
                        cls: 'foo'
                    }
                }
            });

            field.addTrigger('bar', {
                type: 'expand',
                cls: 'bar'
            });

            expect(triggers.foo instanceof Ext.field.trigger.Trigger).toBe(true);
            expect(triggers.foo.element).toHaveCls('foo');
            expect(triggers.bar instanceof Ext.field.trigger.Expand).toBe(true);
            expect(triggers.bar.element).toHaveCls('bar');
        });

        it("should add a trigger by type string (no config object)", function() {
            makeField({
                triggers: {
                    foo: {
                        cls: 'foo'
                    }
                }
            });

            field.addTrigger('bar', 'expand');

            expect(triggers.foo instanceof Ext.field.trigger.Trigger).toBe(true);
            expect(triggers.foo.element).toHaveCls('foo');
            expect(triggers.bar instanceof Ext.field.trigger.Expand).toBe(true);
        });

        it("should add an already instanced trigger", function() {
            makeField({
                triggers: {
                    foo: {
                        cls: 'foo'
                    }
                }
            });

            var barTrigger = new Ext.field.trigger.Trigger({
                cls: 'bar'
            });

            field.addTrigger('bar', barTrigger);

            expect(triggers.foo instanceof Ext.field.trigger.Trigger).toBe(true);
            expect(triggers.foo.element).toHaveCls('foo');
            expect(triggers.bar).toBe(barTrigger);
        });

        it("should not allow addition of a trigger with the same key as an existing trigger", function() {
            makeField({
                triggers: {
                    foo: {
                        cls: 'foo'
                    }
                }
            });

            expect(function() {
                field.addTrigger('foo', {
                    cls: 'bar'
                });
            }).toThrow('Trigger with name "foo" already exists.');
        });

        it("should add a trigger when there are no existing triggers", function() {
            makeField({
                clearIcon:false
            });

            expect(Object.keys(triggers).length).toBe(0);

            field.addTrigger('bar', {
                cls: 'bar'
            });

            expect(Object.keys(triggers).length).toBe(1);
            expect(triggers.bar instanceof Ext.field.trigger.Trigger).toBe(true);
            expect(triggers.bar.element).toHaveCls('bar');
        });

        it("should throw an error if the first argument to addTrigger() is not a string", function() {
            makeField();

            expect(function() {
                field.addTrigger({}, {});
            }).toThrow('Cannot add trigger. Key must be a string');
        });

        it("should throw an error if the second argument to addTrigger() is not an object", function() {
            makeField();

            expect(function() {
                field.addTrigger('foo');
            }).toThrow('Cannot add trigger "foo". A trigger config or instance is required.');
        });

        it("should remove a trigger by key", function() {
            makeField({
                clearIcon: false,
                triggers: {
                    foo: {
                        cls: 'foo'
                    }
                }
            });

            var trigger = triggers.foo;
            var triggerEl = trigger.el.dom;

            field.removeTrigger('foo');
            expect(Object.keys(triggers).length).toBe(0);
            expect(triggerEl.parentNode).toBe(null);
            expect(trigger.destroyed).toBe(true);
        });

        it("should remove a trigger by reference", function() {
            makeField({
                triggers: {
                    foo: {
                        cls: 'foo'
                    }
                }
            });

            var trigger = triggers.foo;
            var triggerEl = trigger.el.dom;

            field.removeTrigger(triggers.foo);
            expect(Object.keys(triggers).length).toBe(1); // still has a clear icon
            expect(triggerEl.parentNode).toBe(null);
            expect(trigger.destroyed).toBe(true);
        });

        it("should prevent destruction of the trigger", function() {
            makeField({
                clearIcon: false,
                triggers: {
                    foo: {
                        cls: 'foo'
                    }
                }
            });

            var trigger = triggers.foo;

            field.removeTrigger(triggers.foo, false);
            expect(Object.keys(triggers).length).toBe(0);
            expect(trigger.el.dom.parentNode).toBe(null);
            expect(trigger.destroyed).toBe(false);

            trigger.destroy();
        });

        it("should throw an error if non-existent key is passed to removeTrigger", function() {
            makeField({
                triggers: {
                    foo: {
                        cls: 'foo'
                    }
                }
            });

            expect(function() {
                field.removeTrigger('bar');
            }).toThrow('Cannot remove trigger. Trigger with name "bar" not found.');
        });

        it("should throw an error if non-existent trigger is passed to removeTrigger()", function() {
            makeField({
                triggers: {
                    foo: {
                        cls: 'foo'
                    }
                }
            });

            var trigger = new Ext.field.trigger.Trigger();

            expect(function() {
                field.removeTrigger(trigger);
            }).toThrow('Trigger not found.');

            trigger.destroy();
        });

        it("should add triggers using setTrigger()", function() {
            makeField({
                triggers: {
                    foo: {
                        cls: 'foo'
                    }
                }
            });

            field.setTriggers({
                bar: {
                    cls: 'bar'
                },
                baz: {
                    type: 'expand'
                }
            });

            expect(Object.keys(triggers).length).toBe(4);
            expect(triggers.foo.el).toHaveCls('foo');
            expect(triggers.bar.el).toHaveCls('bar');
            expect(triggers.baz instanceof Ext.field.trigger.Expand).toBe(true);
        });

        it("should remove triggers using setTrigger()", function() {

        });

        it("should replace a trigger using setTrigger()", function() {
            makeField({
                triggers: {
                    foo: {
                        cls: 'foo'
                    }
                }
            });

            var originalFoo = triggers.foo;
            var originalFooEl = triggers.foo.el.dom;

            field.setTriggers({
                foo: {
                    cls: 'bar'
                }
            });

            expect(Object.keys(triggers).length).toBe(2); // including clear trigger
            expect(triggers.foo).not.toBe(originalFoo);
            expect(triggers.foo.el).toHaveCls('bar');
            expect(originalFooEl.parentNode).toBe(null);

            expect(originalFoo.destroyed).toBe(true);
        });

        it("should align triggers to the right", function() {
            makeField({
                width: 200,
                triggers: {
                    foo: {
                        cls: 'foo'
                    },
                    bar: {
                        cls: 'bar'
                    }
                }
            });

            expect(field).toHaveLayout({
                el: {
                    w: 200
                },
                '.foo': { x: 155 },
                '.bar': { x: 177 }
            });
        });

        it("should align triggers to the left", function() {
            makeField({
                width: 200,
                triggers: {
                    foo: {
                        cls: 'foo',
                        side: 'left'
                    },
                    bar: {
                        cls: 'bar',
                        side: 'left'
                    }
                }
            });

            expect(field).toHaveLayout({
                el: {
                    w: 200
                },
                '.foo': { x: 1 },
                '.bar': { x: 23 }
            });
        });

        it("should group triggers", function() {
            makeField({
                width: 200,
                triggers: {
                    grp: {},
                    foo: {
                        cls: 'foo',
                        group: 'grp'
                    },
                    bar: {
                        cls: 'bar'
                    },
                    baz: {
                        cls: 'baz',
                        group: 'grp'
                    }
                }
            });

            expect(triggers.grp.getTriggers()[0].el).toHaveCls('foo');
            expect(triggers.grp.getTriggers()[1].el).toHaveCls('baz');

            expect(triggers.foo.el.dom.parentNode).toBe(triggers.grp.el.dom);
            expect(triggers.bar.el.dom.parentNode).not.toBe(triggers.grp.el.dom);
            expect(triggers.baz.el.dom.parentNode).toBe(triggers.grp.el.dom);
        });

        it("should add an iconCls to a trigger using initial config", function() {
            makeField({
                width: 200,
                triggers: {
                    foo: {
                        iconCls: 'fooIcon'
                    }
                }
            });

            expect(triggers.foo.iconElement).toHaveCls('fooIcon');
        });

        it("should set the iconCls of a trigger after instantiation", function() {
            makeField({
                width: 200,
                triggers: {
                    foo: {}
                }
            });

            triggers.foo.setIconCls('fooIcon');

            expect(triggers.foo.iconElement).toHaveCls('fooIcon');
        });

        describe("weight", function() {
            it("should sort left-aligned triggers by weight", function() {
                makeField({
                    width: 200,
                    triggers: {
                        a: {
                            cls: 'a',
                            weight: 3
                        },
                        b: {
                            cls: 'b',
                            weight: -2
                        },
                        c: {
                            cls: 'c' // default weight of 0
                        }
                    }
                });

                expect(field).toHaveLayout({
                    el: {
                        w: 200
                    },
                    '.a': { x: 177 },
                    '.b': { x: 133 },
                    '.c': { x: 155 }
                });
            });

            it("should sort right-aligned triggers by weight", function() {
                makeField({
                    width: 200,
                    triggers: {
                        a: {
                            cls: 'a',
                            weight: 3,
                            side: 'left'
                        },
                        b: {
                            cls: 'b',
                            weight: -2,
                            side: 'left'
                        },
                        c: {
                            cls: 'c', // default weight of 0
                            side: 'left'
                        }
                    }
                });

                expect(field).toHaveLayout({
                    el: {
                        w: 200
                    },
                    '.a': { x: 45 },
                    '.b': { x: 1 },
                    '.c': { x: 23 }
                });
            });

            it("should sort by weight within a group", function() {
                makeField({
                    width: 200,
                    triggers: {
                        grp: {},
                        foo: {
                            cls: 'foo',
                            group: 'grp',
                            weight: 5
                        },
                        bar: {
                            cls: 'bar'
                        },
                        baz: {
                            cls: 'baz',
                            group: 'grp',
                            weight: 4
                        }
                    }
                });

                expect(triggers.grp.getTriggers()[0].el).toHaveCls('baz');
                expect(triggers.grp.getTriggers()[1].el).toHaveCls('foo');
            });
        });

        describe("handler", function() {
            it("should not have the x-interactive cls when there is no handler", function() {
                makeField({
                    triggers: {
                        foo: {}
                    }
                });

                expect(triggers.foo.el).not.toHaveCls('x-interactive');
            });

            it("should have the x-interactive cls when there is a handler", function() {
                makeField({
                    triggers: {
                        foo: {
                            handler: function() {}
                        }
                    }
                });

                expect(triggers.foo.el).toHaveCls('x-interactive');
            });

            it("should call the handler when the trigger is clicked", function() {
                var spy = jasmine.createSpy();

                makeField({
                    triggers: {
                        foo: {
                            handler: spy
                        }
                    }
                });

                Ext.testHelper.tap(triggers.foo.el);

                expect(spy).toHaveBeenCalled();
            });

            it("should use the field as the default scope", function() {
                var spy = jasmine.createSpy();

                makeField({
                    triggers: {
                        foo: {
                            handler: spy
                        }
                    }
                });

                Ext.testHelper.tap(triggers.foo.el);

                expect(spy.mostRecentCall.scope).toBe(field);
            });

            it("should call the handler using the specified scope", function() {
                var spy = jasmine.createSpy(),
                    scope = new Ext.Component();

                makeField({
                    triggers: {
                        foo: {
                            handler: spy,
                            scope: scope
                        }
                    }
                });

                Ext.testHelper.tap(triggers.foo.el);

                expect(spy.mostRecentCall.scope).toBe(scope);

                scope.destroy();
            });
        });
    });
});
