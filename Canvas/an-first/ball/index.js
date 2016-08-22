(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes
lib.webFontTxtFilters = {}; 

// library properties:
lib.properties = {
	width: 550,
	height: 400,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	webfonts: {},
	manifest: []
};



lib.ssMetadata = [];


lib.webfontAvailable = function(family) { 
	lib.properties.webfonts[family] = true;
	var txtFilters = lib.webFontTxtFilters && lib.webFontTxtFilters[family] || [];
	for(var f = 0; f < txtFilters.length; ++f) {
		txtFilters[f].updateCache();
	}
};
// symbols:



(lib.Symbol1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#FF0000","#000000"],[0,1],0,0,0,0,0,40.9).s().p("AkaEaQh1h1AAilQAAikB1h2QB2h1CkAAQClAAB1B1QB2B2AACkQAAClh2B1Qh1B2ilAAQikAAh2h2g");
	this.shape.setTransform(40,40);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,80,80);


// stage content:
(lib.Untitled1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 2 copy 2
	this.instance = new lib.Symbol1();
	this.instance.setTransform(67.2,153.5,1,1,0,0,0,39.1,77.4);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(36).to({_off:false},0).wait(1).to({regX:40,regY:40,x:73.3,y:116.2},0).wait(1).to({x:78.5,y:116.5},0).wait(1).to({x:83.7,y:117.1},0).wait(1).to({x:89,y:117.9},0).wait(1).to({x:94.2,y:118.9},0).wait(1).to({x:99.4,y:120.1},0).wait(1).to({x:104.7,y:121.6},0).wait(1).to({x:109.9,y:123.3},0).wait(1).to({x:115.1,y:125.2},0).wait(1).to({x:120.4,y:127.3},0).wait(1).to({x:125.6,y:129.7},0).wait(1).to({x:130.8,y:132.3},0).wait(1).to({x:136,y:135.1},0).wait(1).to({x:141.3,y:138.2},0).wait(1).to({x:146.5,y:141.4},0).wait(1).to({x:151.7,y:144.9},0).wait(1).to({x:157,y:148.7},0).wait(1).to({x:162.2,y:152.6},0).wait(1).to({x:167.4,y:156.8},0).wait(1).to({x:172.7,y:161.2},0).wait(1).to({x:177.9,y:165.8},0).wait(1).to({x:183.1,y:170.6},0).wait(1).to({x:188.3,y:175.7},0).wait(1).to({x:193.6,y:181},0).wait(1).to({x:198.8,y:186.6},0).wait(1).to({x:204,y:192.3},0).wait(1).to({x:209.3,y:198.3},0).wait(1).to({x:214.5,y:204.5},0).wait(1).to({x:219.7,y:210.9},0).wait(1).to({x:225,y:217.6},0).wait(1).to({x:230.2,y:224.5},0).wait(1).to({x:235.4,y:231.6},0).wait(1).to({x:240.7,y:238.9},0).wait(1).to({x:245.9,y:246.4},0).wait(1).to({x:251.1,y:254.2},0).wait(1).to({scaleX:1.44,scaleY:0.73,x:256.8,y:272.2},0).wait(1).to({scaleX:1.5,scaleY:0.7,x:262,y:262.2},0).wait(1).to({scaleX:1.44,scaleY:0.73,x:267.2,y:251},0).wait(1).to({scaleX:1,scaleY:1,x:272,y:232.4},0).wait(1).to({x:277.3,y:225.1},0).wait(1).to({x:282.5,y:219.1},0).wait(1).to({x:287.7,y:214.4},0).wait(1).to({x:293,y:211.1},0).wait(1).to({x:298.2,y:209.1},0).wait(1).to({x:303.4,y:208.5},0).wait(1).to({x:308.6,y:209.1},0).wait(1).to({x:313.9,y:211.1},0).wait(1).to({x:319.1,y:214.4},0).wait(1).to({x:324.3,y:219.1},0).wait(1).to({x:329.6,y:225.1},0).wait(1).to({x:334.8,y:232.4},0).wait(1).to({x:340,y:241},0).wait(1).to({x:345.3,y:251},0).wait(1).to({scaleX:1.3,scaleY:0.8,x:350.8,y:269.7},0).wait(1).to({scaleX:1,scaleY:1,x:355.7,y:256.2},0).wait(1).to({x:361,y:251.3},0).wait(1).to({x:366.2,y:247.4},0).wait(1).to({x:371.4,y:244.7},0).wait(1).to({x:376.6,y:243},0).wait(1).to({x:381.9,y:242.5},0).wait(1).to({x:387.1,y:243},0).wait(1).to({x:392.3,y:244.7},0).wait(1).to({x:397.6,y:247.4},0).wait(1).to({x:402.8,y:251.3},0).wait(1).to({x:408,y:256.2},0).wait(1).to({x:413.3,y:262.3},0).wait(1).to({scaleX:1.2,scaleY:0.9,x:418.7,y:262.8},0).wait(1).to({scaleX:1,scaleY:1,x:423.7,y:256.8},0).wait(1).to({x:428.9,y:255.4},0).wait(1).to({x:434.2,y:255},0).wait(1).to({x:439.4,y:255.4},0).wait(1).to({x:444.6,y:256.8},0).wait(1).to({x:449.9,y:259.1},0).wait(1).to({x:455.1,y:262.3},0).wait(1));

	// Layer 2 copy
	this.instance_1 = new lib.Symbol1();
	this.instance_1.setTransform(67.2,153.5,1,1,0,0,0,39.1,77.4);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(19).to({_off:false},0).wait(1).to({regX:40,regY:40,x:73.3,y:116.2},0).wait(1).to({x:78.5,y:116.5},0).wait(1).to({x:83.7,y:117.1},0).wait(1).to({x:89,y:117.9},0).wait(1).to({x:94.2,y:118.9},0).wait(1).to({x:99.4,y:120.1},0).wait(1).to({x:104.7,y:121.6},0).wait(1).to({x:109.9,y:123.3},0).wait(1).to({x:115.1,y:125.2},0).wait(1).to({x:120.4,y:127.3},0).wait(1).to({x:125.6,y:129.7},0).wait(1).to({x:130.8,y:132.3},0).wait(1).to({x:136,y:135.1},0).wait(1).to({x:141.3,y:138.2},0).wait(1).to({x:146.5,y:141.4},0).wait(1).to({x:151.7,y:144.9},0).wait(1).to({x:157,y:148.7},0).wait(1).to({x:162.2,y:152.6},0).wait(1).to({x:167.4,y:156.8},0).wait(1).to({x:172.7,y:161.2},0).wait(1).to({x:177.9,y:165.8},0).wait(1).to({x:183.1,y:170.6},0).wait(1).to({x:188.3,y:175.7},0).wait(1).to({x:193.6,y:181},0).wait(1).to({x:198.8,y:186.6},0).wait(1).to({x:204,y:192.3},0).wait(1).to({x:209.3,y:198.3},0).wait(1).to({x:214.5,y:204.5},0).wait(1).to({x:219.7,y:210.9},0).wait(1).to({x:225,y:217.6},0).wait(1).to({x:230.2,y:224.5},0).wait(1).to({x:235.4,y:231.6},0).wait(1).to({x:240.7,y:238.9},0).wait(1).to({x:245.9,y:246.4},0).wait(1).to({x:251.1,y:254.2},0).wait(1).to({scaleX:1.44,scaleY:0.73,x:256.8,y:272.2},0).wait(1).to({scaleX:1.5,scaleY:0.7,x:262,y:262.2},0).wait(1).to({scaleX:1.44,scaleY:0.73,x:267.2,y:251},0).wait(1).to({scaleX:1,scaleY:1,x:272,y:232.4},0).wait(1).to({x:277.3,y:225.1},0).wait(1).to({x:282.5,y:219.1},0).wait(1).to({x:287.7,y:214.4},0).wait(1).to({x:293,y:211.1},0).wait(1).to({x:298.2,y:209.1},0).wait(1).to({x:303.4,y:208.5},0).wait(1).to({x:308.6,y:209.1},0).wait(1).to({x:313.9,y:211.1},0).wait(1).to({x:319.1,y:214.4},0).wait(1).to({x:324.3,y:219.1},0).wait(1).to({x:329.6,y:225.1},0).wait(1).to({x:334.8,y:232.4},0).wait(1).to({x:340,y:241},0).wait(1).to({x:345.3,y:251},0).wait(1).to({scaleX:1.3,scaleY:0.8,x:350.8,y:269.7},0).wait(1).to({scaleX:1,scaleY:1,x:355.7,y:256.2},0).wait(1).to({x:361,y:251.3},0).wait(1).to({x:366.2,y:247.4},0).wait(1).to({x:371.4,y:244.7},0).wait(1).to({x:376.6,y:243},0).wait(1).to({x:381.9,y:242.5},0).wait(1).to({x:387.1,y:243},0).wait(1).to({x:392.3,y:244.7},0).wait(1).to({x:397.6,y:247.4},0).wait(1).to({x:402.8,y:251.3},0).wait(1).to({x:408,y:256.2},0).wait(1).to({x:413.3,y:262.3},0).wait(1).to({scaleX:1.2,scaleY:0.9,x:418.7,y:262.8},0).wait(1).to({scaleX:1,scaleY:1,x:423.7,y:256.8},0).wait(1).to({x:428.9,y:255.4},0).wait(1).to({x:434.2,y:255},0).wait(1).to({x:439.4,y:255.4},0).wait(1).to({x:444.6,y:256.8},0).wait(1).to({x:449.9,y:259.1},0).wait(1).to({x:455.1,y:262.3},0).to({_off:true},1).wait(17));

	// Layer 2
	this.instance_2 = new lib.Symbol1();
	this.instance_2.setTransform(67.2,153.5,1,1,0,0,0,39.1,77.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1).to({regX:40,regY:40,x:73.3,y:116.2},0).wait(1).to({x:78.5,y:116.5},0).wait(1).to({x:83.7,y:117.1},0).wait(1).to({x:89,y:117.9},0).wait(1).to({x:94.2,y:118.9},0).wait(1).to({x:99.4,y:120.1},0).wait(1).to({x:104.7,y:121.6},0).wait(1).to({x:109.9,y:123.3},0).wait(1).to({x:115.1,y:125.2},0).wait(1).to({x:120.4,y:127.3},0).wait(1).to({x:125.6,y:129.7},0).wait(1).to({x:130.8,y:132.3},0).wait(1).to({x:136,y:135.1},0).wait(1).to({x:141.3,y:138.2},0).wait(1).to({x:146.5,y:141.4},0).wait(1).to({x:151.7,y:144.9},0).wait(1).to({x:157,y:148.7},0).wait(1).to({x:162.2,y:152.6},0).wait(1).to({x:167.4,y:156.8},0).wait(1).to({x:172.7,y:161.2},0).wait(1).to({x:177.9,y:165.8},0).wait(1).to({x:183.1,y:170.6},0).wait(1).to({x:188.3,y:175.7},0).wait(1).to({x:193.6,y:181},0).wait(1).to({x:198.8,y:186.6},0).wait(1).to({x:204,y:192.3},0).wait(1).to({x:209.3,y:198.3},0).wait(1).to({x:214.5,y:204.5},0).wait(1).to({x:219.7,y:210.9},0).wait(1).to({x:225,y:217.6},0).wait(1).to({x:230.2,y:224.5},0).wait(1).to({x:235.4,y:231.6},0).wait(1).to({x:240.7,y:238.9},0).wait(1).to({x:245.9,y:246.4},0).wait(1).to({x:251.1,y:254.2},0).wait(1).to({scaleX:1.44,scaleY:0.73,x:256.8,y:272.2},0).wait(1).to({scaleX:1.5,scaleY:0.7,x:262,y:262.2},0).wait(1).to({scaleX:1.44,scaleY:0.73,x:267.2,y:251},0).wait(1).to({scaleX:1,scaleY:1,x:272,y:232.4},0).wait(1).to({x:277.3,y:225.1},0).wait(1).to({x:282.5,y:219.1},0).wait(1).to({x:287.7,y:214.4},0).wait(1).to({x:293,y:211.1},0).wait(1).to({x:298.2,y:209.1},0).wait(1).to({x:303.4,y:208.5},0).wait(1).to({x:308.6,y:209.1},0).wait(1).to({x:313.9,y:211.1},0).wait(1).to({x:319.1,y:214.4},0).wait(1).to({x:324.3,y:219.1},0).wait(1).to({x:329.6,y:225.1},0).wait(1).to({x:334.8,y:232.4},0).wait(1).to({x:340,y:241},0).wait(1).to({x:345.3,y:251},0).wait(1).to({scaleX:1.3,scaleY:0.8,x:350.8,y:269.7},0).wait(1).to({scaleX:1,scaleY:1,x:355.7,y:256.2},0).wait(1).to({x:361,y:251.3},0).wait(1).to({x:366.2,y:247.4},0).wait(1).to({x:371.4,y:244.7},0).wait(1).to({x:376.6,y:243},0).wait(1).to({x:381.9,y:242.5},0).wait(1).to({x:387.1,y:243},0).wait(1).to({x:392.3,y:244.7},0).wait(1).to({x:397.6,y:247.4},0).wait(1).to({x:402.8,y:251.3},0).wait(1).to({x:408,y:256.2},0).wait(1).to({x:413.3,y:262.3},0).wait(1).to({scaleX:1.2,scaleY:0.9,x:418.7,y:262.8},0).wait(1).to({scaleX:1,scaleY:1,x:423.7,y:256.8},0).wait(1).to({x:428.9,y:255.4},0).wait(1).to({x:434.2,y:255},0).wait(1).to({x:439.4,y:255.4},0).wait(1).to({x:444.6,y:256.8},0).wait(1).to({x:449.9,y:259.1},0).wait(1).to({x:455.1,y:262.3},0).to({_off:true},1).wait(36));

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AGQAAQAAClh2B1Qh1B2ilAAQikAAh2h2Qh1h1AAilQAAikB1h2QB2h1CkAAQClAAB1B1QB2B2AACkg");
	this.shape.setTransform(68.1,116.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).to({_off:true},1).wait(110));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(302.1,275.1,82,82);

})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var lib, images, createjs, ss;