Vue.component('children', {
    template: '#child-template',
    props: ['item']
});
var $menu;
var $body = $('body').css('position', 'relative');
var App = new Vue({
    el: '#app',
    data: {
        children: window.menuData.slice(),
        hint: null,
        hintWrapper: null,
        placeholder: null,
        settings:{},
        state: {
            // currentEl is currently dragged element
            currentEl: null,
            doc: $(document),
            win: $(window),
            isAllowed: true,
            isDragged: false,
            // How browser counts elementFromPoint() position (relative to window/document)
            isRelativeEFP: null,
            // overEl is element which returns elementFromPoint() method
            overEl: null,
            placeholderNode:null,
            rootEl: null,


            upScroll: false,
            downScroll: false,
            pX: 0,
            pY: 0,
            cX: 0,
            cY: 0,
        }
    },
    ready: function() {
        var defaults = {
            currentElClass: '',
            placeholderClass: '',
            placeholderCss: {
                'position': 'relative',
                'padding': 0
            },
            hintClass: '',
            hintCss: {
                'display': 'none',
                'position': 'relative',
                'padding': 0
            },
            hintWrapperClass: '',
            hintWrapperCss: { /* Description is below the defaults in this var section */ },
            baseClass: '',
            baseCss: {
                'position': 'absolute',
                'top': 0 - parseInt($body.css('margin-top')),
                'left': 0 - parseInt($body.css('margin-left')),
                'margin': 0,
                'padding': 0,
                'z-index': 2500
            },
            opener: {
                active: false,
                as: 'class',
                open: '',
                close: '',
                openerCss: {
                    'float': 'left',
                    'display': 'inline-block',
                    'background-position': 'center center',
                    'background-repeat': 'no-repeat'
                },
                openerClass: ''
            },
            listSelector: 'ul',
            listsClass: '', // Used for hintWrapper and baseElement
            listsCss: {},
            insertZone: 50,
            insertZonePlus: false,
            scroll: 20,
            ignoreClass: '',
            isAllowed: function(currentEl, hint, target) { return true; },  // Params: current el., hint el.
            onDragStart: function(e, currentEl) { return true; },  // Params: e jQ. event obj., current el.
            onChange: function(currentEl) { return true; },  // Params: current el.
            complete: function(currentEl) { return true; }  // Params: current el.
        };

        this.settings = $.extend(true, {}, defaults, {});

        // base element from which is counted position of draged element
        this.base = $('<' + this.settings.listSelector + ' />')
            .prependTo($body)
            .attr('id', 'nestBase')
            .css(this.settings.baseCss)
            .addClass(this.settings.listsClass + ' ' + this.settings.baseClass);

        // placeholder != state.placeholderNode
        // placeholder is document fragment and state.placeholderNode is document node
        this.placeholder = $('<li />')
            .attr('id', 'nestPlaceholder')
            .css(this.settings.placeholderCss)
            .addClass(this.settings.placeholderClass);

        // hint is document fragment
        this.hint = $('<li />')
            .attr('id', 'nestHint')
            .css(this.settings.hintCss)
            .addClass(this.settings.hintClass);

        // Is document fragment used as wrapper if hint is inserted to the empty li
        this.hintWrapper = $('<' + this.settings.listSelector + ' />')
            .attr('id', 'nestHintWrapper')
            .addClass(this.settings.listsClass + ' ' + this.settings.hintWrapperClass)
            .css(this.settings.listsCss)
            .css(this.settings.hintWrapperCss);
    },
    methods: {
        handleMousedown: function(event) {
            var target = event.target;

            if (this.state.isDragged !== false || !target.classList.contains('js-handle')) {
                return;
            }

            // Solves selection/range highlighting
            event.preventDefault();

            var parentElement = $(target).closest('li'),
                rootElement = $(target).closest('.js-container');

            // Check if el is not empty
            if (parentElement[0]) {
                this.startDrag(event, parentElement, rootElement);
            }
        },
        startDrag: function(event, el, rootEl) {
            this.state.isDragged = true;

            var elMT = parseInt(el.css('margin-top')), // parseInt is necesary cause value has px at the end
                elMB = parseInt(el.css('margin-bottom')),
                elML = parseInt(el.css('margin-left')),
                elMR = parseInt(el.css('margin-right')),
                elXY = el.offset(),
                elIH = el.innerHeight();

            this.state.rootEl = {
                el: rootEl,
                offset: rootEl.offset(),
                rootElClass: rootEl.attr('class')
            };

            this.state.currentEl = {
                el: el,
                mT: elMT,
                mL: elML,
                mB: elMB,
                mR: elMR,
                offset: elXY
            };

            this.state.currentEl.xyOffsetDiff = {
                X: event.pageX - this.state.currentEl.offset.left,
                Y: event.pageY - this.state.currentEl.offset.top
            };
            this.state.currentEl.el.addClass(this.settings.currentElClass);

            // Now document has node placeholder
            el.before(this.placeholder);

            // jQuery object && document node
            this.state.placeholderNode = $('#nestPlaceholder');

            el.css({
                'width': el.width(),
                'position': 'absolute',
                'top': elXY.top - elMT,
                'left': elXY.left - elML
            }).prependTo(this.base);

            this.state.placeholderNode.css({
                'display': 'block',
                'height': elIH
            });

            this.hint.css('height', elIH);

            this.state.doc
                .on('mousemove', this.dragging)
                .on('mouseup', this.endDrag);
        },

        /**
         * Start dragging
         * @param event
         */
        dragging: function(event) {
            if (this.state.isDragged) {

                // Event triggered by trigger() from setInterval does not have XY properties
                if (!event.pageX) {
                    this.setEventPos(event);
                }

                // // Scrolling up
                // if (this.state.doc.scrollTop() > this.state.rootEl.offset.top - 10 && e.clientY < 50) {
                //     // Has to be here after cond. e.clientY < 50 cause else unsets the interval
                //     if (! this.state.upScroll) {
                //         setScrollUp(e);
                //     } else {
                //         event.pageY = event.pageY - this.settings.scroll;
                //         $('html, body').each(function(i) {
                //             $(this).scrollTop($(this).scrollTop() - this.settings.scroll);
                //         });
                //         setCursorPos(e);
                //     }
                // // Scrolling down
                // } else if (this.state.doc.scrollTop() + this.state.win.height() < this.state.rootEl.offset.top + this.state.rootEl.el.outerHeight(false) + 10 && this.state.win.height() - e.clientY < 50) {
                //     if (!this.state.downScroll) {
                //         setScrollDown(e);
                //     } else {
                //         event.pageY = event.pageY + this.settings.scroll;
                //         $('html, body').each(function(i) {
                //             $(this).scrollTop($(this).scrollTop() + this.settings.scroll);
                //         });
                //         setCursorPos(event);
                //     }
                // } else {
                //     scrollStop(this.state);
                // }

                // Script needs to know old overEl
                this.state.overElOld = this.state.overEl;

                // This is important for the next row
                this.state.currentEl.el[0].style.visibility = 'hidden';
                this.state.overEl = overEl = this.elFromPoint(event.pageX, event.pageY);
                this.state.currentEl.el[0].style.visibility = 'visible';

                this.showHint(event, this.state);
                this.setCurrentElPos(event, this.state);
            }
        },
        /**
         * @desc endDrag unbinds events mousemove/mouseup and removes redundant elements
         * @param e
         */
        endDrag: function(event) {
            var _this = this,
                hintNode = $('#nestHint', _this.state.rootEl.el),
                hintStyle = this.hint[0].style,
                // hintNode/placeholderNode
                targetEl = null,
                // If currentEl will be placed to the hintNode
                isHintTarget = false,
                hintWrapperNode = $('#nestHintWrapper');

            if (hintStyle.display === 'block' && hintNode.length && _this.state.isAllowed) {
                targetEl = hintNode;
                isHintTarget = true;
            } else {
                targetEl = _this.state.placeholderNode;
                isHintTarget = false;
            }

            offset = targetEl.offset();

            _this.state.currentEl.el.animate({
                left: offset.left - _this.state.currentEl.mL,
                top: offset.top - _this.state.currentEl.mT
            }, 250, function() {
                _this.tidyCurrentEl(_this.state.currentEl);

                targetEl.after(_this.state.currentEl.el[0]);
                targetEl[0].style.display = 'none';
                hintStyle.display = 'none';
                // This needs to be document node, not hint as a part of documentFragment.
                hintNode.remove();

                hintWrapperNode
                    .removeAttr('id')
                    .removeClass(_this.settings.hintWrapperClass);

                if (hintWrapperNode.length) {
                    console.log('opener stuff')
                    // hintWrapperNode.prev('div').append(opener.clone(true));
                }

                // Directly removed placeholder looks bad. It jumps up if the hint is below.
                if (isHintTarget) {
                    _this.state.placeholderNode.slideUp(150, function() {
                        _this.state.placeholderNode.remove();
                        _this.tidyEmptyLists();
                        _this.settings.onChange(_this.state.currentEl.el);
                        // Have to be here cause is necessary to remove placeholder before complete call.
                        _this.settings.complete(_this.state.currentEl.el);
                        _this.state.isDragged = false;
                    });
                } else {
                    _this.state.placeholderNode.remove();
                    _this.tidyEmptyLists();
                    _this.settings.complete(_this.state.currentEl.el);
                    _this.state.isDragged = false;
                }
            });

            // _this.scrollStop(_this.state);

            _this.state.doc
                .unbind('mousemove', _this.dragging)
                .unbind('mouseup', _this.endDrag);
        },
        /**
         * Return elementFromPoint() result as jQuery object
         * @param  {int}         x  event.pageX
         * @param  {int}         y  event.pageY
         * @return {null|jQuery}
         */
        elFromPoint: function(pageX, pageY) {
            // FF/IE/CH needs coordinates relative to the window, unlike
            // Opera/Safari which needs absolute coordinates of document in elementFromPoint()
            if (!document.elementFromPoint) {
                return null;
            }

            // isRelativeEFP === null means it is not checked yet
            if (this.state.isRelativeEFP === null) {
                var scrollTop;
                var result;

                if ((scrollTop = this.state.doc.scrollTop()) > 0) {
                    this.state.isRelativeEFP = (
                        (result = document.elementFromPoint(0, scrollTop + this.state.win.height() - 1)) === null
                        ||
                        // IE8 returns HTML
                        result.tagName.toUpperCase() === 'HTML');
                }

                if ((scrollTop = this.state.doc.scrollLeft()) > 0) {
                    this.state.isRelativeEFP = (
                        (result = document.elementFromPoint(scrollTop + this.state.win.width() - 1, 0)) === null
                        ||
                        // IE8 returns html
                        result.tagName.toUpperCase() === 'HTML');
                }
            }

            if (this.state.isRelativeEFP) {
                pageX -= this.state.doc.scrollLeft();
                pageY -= this.state.doc.scrollTop();
            }

            var $element = $(document.elementFromPoint(pageX, pageY));

            // $element is outside the rootEl
            if (!this.state.rootEl.el.find($element).length) {
                return null;
            // $element is #placeholder/#hint
            } else if ($element.is('#nestPlaceholder') || $element.is('#nestHint')) {
                return null;
            } else if (!$element.is('li')) {
                $element = $element.closest('li');
                return $element[0] ? $element : null;
            // $element is desired li
            } else if ($element.is('li')) {
                return $element;
            }
        },
        /**
         * Sets the position of dragged element
         * @param {object} event MouseEvent
         */
        showHint: function(event) {
            // If overEl is null or if this is the first call in dragging
            if (!this.state.overEl || !this.state.overElOld) {
                return;
            }

            var overElHeight = this.state.overEl.outerHeight(false),
                relativeY = event.pageY - this.state.overEl.offset().top;

            if (this.settings.insertZonePlus) {
                // Inserting on top
                if (14 > relativeY) {
                    // Last boolean param expresses if hint should be inserted outside or inside
                    this.showOnTopPlus(event, this.state.overEl, 7 > relativeY);
                // Inserting on bottom
                } else if (overElHeight - 14 < relativeY) {
                    this.showOnBottomPlus(event, this.state.overEl, overElHeight - 7 < relativeY);
                }
            } else {
                // Inserting on top
                if (5 > relativeY) {
                    this.showOnTop(event, this.state.overEl);
                // Inserting on bottom
                } else if (overElHeight - 5 < relativeY) {
                    this.showOnBottom(event, this.state.overEl);
                }
            }
        },
        /**
         * Places the currentEl to the target place
         * @param currentEl
         */
        tidyCurrentEl: function(currentEl) {
            var currentElStyle = currentEl.el[0].style;
            currentEl.el.removeClass(this.settings.currentElClass);
            currentElStyle.top = '0';
            currentElStyle.left = '0';
            currentElStyle.position = 'relative';
            currentElStyle.width = 'auto';
        },
        /**
         * Removes empty lists and redundant openers
         */
        tidyEmptyLists:function() {
            // Remove every empty ul/ol from root
            $(this.settings.listSelector, this.state.rootEl.el).each(function(){
                if (!$(this).children().length) {
                    $(this).remove();
                }
            });
        },
        /**
         * Sets the position of dragged element
         * @param {object} event MouseEvent
         */
        setCurrentElPos: function(event) {
            this.state.currentEl.el.css({
                top: event.pageY - this.state.currentEl.xyOffsetDiff.Y - this.state.currentEl.mT,
                left: event.pageX - this.state.currentEl.xyOffsetDiff.X - this.state.currentEl.mL
            });
        },
        showOnTop: function() {},
        showOnBottom: function() {},
        showOnTopPlus: function() {},
        showOnBottomPlus: function() {}
    }
});

function initSortableLists() {
    $menu = $('#menu');
    var sortableListsOptions = {
        insertZonePlus: true,
        placeholderClass: 'nest-placeholder',
        hintClass: 'nest-hint',
        ignoreClass: 'clickable',
        /**
         * Is called before dragging.
         * @param  e - jQ event object
         * @param  el - dragged li element.
         */
        onDragStart: function(e, currentEl) {
        },
        /**
         * Is called after the drop but only if the position of dragged element was changed.
         * @param  currentEl - currently dragged element.
         */
        onChange: function(currentEl) {
            $menu.sortableListsToHierarchy().forEach
            App.children = $menu.sortableListsToHierarchy();
        },
        /**
         * Is called every time after the drop.
         * @param  currentEl - currently dragged element.
         */
        complete: function(currentEl) { return true; }
    };
    $menu.sortableLists(sortableListsOptions);
}

$(function(){
    // $menu.on('click', '.js-toggle', function(event) {
    //     console.log($(this))
    //     $(this).siblings('.js-content').slideToggle();
    // });
});