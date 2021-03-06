/**
	joTabBar
	=========
	
	Tab bar widget.
	
	Extends
	-------
	
	- joList

	Model
	-----
	
	Data is expected to be an array of `{ data: "", label: ""}` objects,
	in the display order for the bar.

*/
joTabBar = function() {
	joList.apply(this, arguments);
};
joTabBar.extend(joList, {
	formatItem: function(data, index) {
		var o = document.createElement("li");

		if (data.label)
			o.innerHTML = data.label;
		
		if (data.type)
			o.className = data.type;

		o.setAttribute("index", index);
		
		return o;
	},
	
	createContainer: function(tag, classname) {
		return joDOM.create(tag || "jolist", classname);
	}
});
