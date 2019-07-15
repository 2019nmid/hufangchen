window.onload = function(){
	mv.app.toTip();
	mv.app.toSell();
	mv.app.toRun();
}

var mv = {};//命名空间
mv.tools = {};
mv.ui = {};
mv.ui.textChange = function(obj,str){
	obj.onfocus = function(){
		if (this.value == str) {
			this.value = '';
		}
	}
	obj.onblur = function(){
		if (this.value == '') {
			this.value = str;
		}
	}
}
mv.ui.moveLeft = function(obj,old,now){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var iSpeed = (now -old)/10;
		iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
		if (now == old) {
			clearInterval(obj.timer);
		}
		else{
			old += iSpeed;
			obj.style.left = old + 'px';
		}
	}，30);

}
mv.app = {};
mv.app.toTip = function() {
	// body...
	var oText1 = document.getElementById('text1');
	var oText2 = document.getElementById('text2');

	mv.ui.textChange(oText1,'Search website');
	mv.ui.textChange(oText2,'Search website');


}

mv.app.toSell = function(){
	var oSell = document.getElementById('sell');
	var aDd = oSell.getElementsByTagName('dd');
	var aUl = oSell.getElementsByTagName('ul');
	var aH2 = oSell.getElementsByTagName('h2');

	for (var i = 0; i <aDd.length; i++) {
		aDd[i].index = i;

		aDd[i].onclick = function(ev){
			var This = this;
			var ev = ev || window.event;
			for (var i = 0 ; i <aUl.length; i++) {
				aUl[i].style.display = 'none';
			}
			aUl[this.index].style.display = 'block';
			document.onclick = function(){
				aUl[This.index].style.display = 'none';
			}
			ev.cancelBubble = true;
		}
	}
	for (var i = 0; i < aUl.length; i++) {
		aUl[i].index = i;
		(function(ul){
			var aLi = ul.getElementsByTagName('li');
			for (var i = 0; i < aLi.length; i++) {
				aLi[i].onmouseover = function(){
					this.className = 'active';
				}
				aLi[i].onmouseout = function(){
					this.className = '';
				}
				aLi[i].onclick = function(ev){
					var ev = ev || window.event;
					aH2[this.parentNode.index].innerHTML = this.innerHTML;
					ev.cancelBubble = true;
					this.parentNode.style.display = 'none';
				}
			}
		})(aUl[i]);
	}
}

mv.app.toRun = function(){
	var oRun = document.getElementById('run1');
	var oUl = oRun.getElementsByTagName('ul')[0];
	var aLi = oUl.getElementsByTagName('li');

	var oPrev = mv.tools.getByClass(oRun,'prev')[0];
	var oNext = mv.tools.getByClass(oRun,'next')[0];

	oUl.innerHTML += oUl.innerHTML;

	oUl.style.width = aLi.length * aLi[0].offsetWidth + 'px';
	oPrev.onclick = function(){}
	oNext.onclick = function(){
		mv.ui.moveLeft(oUl,iNow*aLi[0].offsetWidth,-(iNow+1)*aLi[0].offsetWidth;
		iNow++;
	}
}