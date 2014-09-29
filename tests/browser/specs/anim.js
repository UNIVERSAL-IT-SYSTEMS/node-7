/**
 * test cases for anim on node
 * @author yiminghe@gmail.com
 */

var $ = require('node');
/*jshint quotmark:false*/

function padding(s) {
    if (s.length === 1) {
        return "0" + s;
    }
    return s;
}

function normalizeColor(c) {
    if (c.toLowerCase().lastIndexOf("rgb(") === 0) {
        var x = [];
        c.replace(/\d+/g, function (m) {
            x.push(padding(Number(m).toString(16)));
        });
        c = "#" + x.join("");
    } else if (c.length === 4) {
        c = c.replace(/[^#]/g, function (c) {
            return c + c;
        });
    }
    return c;
}

describe("anim on node", function () {
    it('fadeIn/fadeOut works', function (done) {
        var n = $('<div style="border:1px solid red;width:100px;height: 100px;">test fadeIn</div>');
        n.appendTo(document.body);
        n.fadeIn(1);
        async.series([
            waits(10),
            runs(function () {
                expect(n.css('opacity')).to.be('1');
                n.fadeOut(0.5);
            }),
            waits(100),
            runs(function () {
                expect(n.css('opacity')).not.to.be('1');
            }),
            waits(600),
            runs(function () {
                expect(n.css('opacity')).to.be('1');
                expect(n.css('display')).to.be('none');
            })], done);
    });

    it("should attach node with slideUp/down well", function (done) {
        var test1 = $("#test6");

        test1.css({
            width: '100px',
            height: '100px',
            'background-color': '#ccc'
        });

        test1.slideUp(0.4);

        async.series([
            waits(100),

            runs(function () {
                expect(test1.css('width')).to.be("100px");
                expect(test1.css("display")).to.be("block");
                expect(test1.css('height')).not.to.be("100px");
                expect(normalizeColor(test1.css("background-color")))
                    .to.be("#cccccc");
            }),

            waits(800),

            runs(function () {
                expect(test1.css('width')).to.be("100px");
                expect(test1.css("display")).to.be("none");
                expect(test1.css('height')).to.be("100px");
                expect(normalizeColor(test1.css("background-color")))
                    .to.be("#cccccc");
            }),

            runs(function () {
                test1.slideDown(0.4);
            }),

            waits(100),

            runs(function () {
                expect(test1.css('width')).to.be("100px");
                expect(test1.css("display")).to.be("block");
                expect(test1.css('height')).not.to.be("100px");
                expect(normalizeColor(test1.css("background-color")))
                    .to.be("#cccccc");
            }),

            waits(800),

            runs(function () {
                expect(test1.css('width')).to.be("100px");
                expect(test1.css("display")).to.be("block");
                expect(test1.css('height')).to.be("100px");
                expect(normalizeColor(test1.css("background-color")))
                    .to.be("#cccccc");
            })
        ], done);
    });

    it("should attach node with show/hide well", function (done) {
        var test2 = $("#test2");

        test2.css({
            width: '100px',
            height: '100px'
        });

        test2.hide(0.2);

        async.series([
            waits(100),

            runs(function () {
                expect(test2.css('width')).not.to.be("100px");
                expect(test2.css("display")).to.be("block");
                expect(test2.css('height')).not.to.be("100px");
                expect(test2.css("opacity") + "").not.to.be('1');
            }),

            waits(200),

            runs(function () {
                expect(test2.css('width')).to.be("100px");
                expect(test2.css("display")).to.be("none");
                expect(test2.css('height')).to.be("100px");
                expect(test2.css("opacity") + "").to.be('1');
            }),

            runs(function () {
                test2.show(0.2);
            }),

            waits(100),

            runs(function () {
                expect(test2.css('width')).not.to.be("100px");
                expect(test2.css("display")).to.be("block");
                expect(test2.css('height')).not.to.be("100px");
                expect(test2.css("opacity") + "").not.to.be('1');
            }),

            waits(200),

            runs(function () {
                expect(test2.css('width')).to.be("100px");
                expect(test2.css("display")).to.be("block");
                expect(test2.css('height')).to.be("100px");
                expect(test2.css("opacity") + "").to.be('1');
            })
        ], done);
    });
});