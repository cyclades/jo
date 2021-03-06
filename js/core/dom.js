/**
	joDOM
	======
	
	Singleton with utility methods for manipulating DOM elements.
	
	Methods
	-------

	- `get(id)`

	  Returns an HTMLElement which has the given id or if the
	  id is not a string returns the value of id.
	
	- `create(type, style)`
	
	  Type is a valid HTML tag type. Style is the same as `setStyle()`
	  method. Returns an HTMLElement.

			// simple
			var x = joDOM.create("div", "mycssclass");

			// more interesting
			var x = joDOM.create("div", {
				id: "name",
				className: "selected",
				background: "#fff",
				color: "#000"
			});

	- `setStyle(tag, style)`
	
	  Style can be an object literal with
	  style information (including "id" or "className") or a string. If
	  it's a string, it will simply use the style string as the className
	  for the new element.
	  
	  Note that the preferred and most cross-platform method for working
	  with the DOM is to use `className` and possibly `id` and put your
	  actual style information in your CSS file. That said, sometimes it's
	  easier to just set the background color in the code. Up to you.
	
	- `getParentWithin(node, ancestor)`

	  Returns an HTMLElement which is
	  the first child of the ancestor which is a parent of a given node.
	
	- `addCSSClass(HTMLElement, classname)`

	  Adds a CSS class to an element unless it is already there.
	
	- `removeCSSClass(HTMLElement, classname)`

	  Removes a CSS class from an element if it exists.
	
	- `toggleCSSClass(HTMLElement, classname)`

	  Auto add or remove a class from an element.

*/
joDOM = {
	enabled: false,
	
	get: function(id) {
		if (typeof id == "string")
			return document.getElementById(id);
		else
			return (typeof id == 'object' && id.tagName) ? id : null;
	},
	
	remove: function(node) {
		if (node.parentNode) {
			node.parentNode.removeChild(node);
		}
	},

	enable: function() {
		this.enabled = true;
	},
	
	getParentWithin: function(node, ancestor) {
		while (node.parentNode !== window && node.parentNode !== ancestor) {
			node = node.parentNode;
		}

		return node;
	},

	addCSSClass: function(node, classname) {
		var n = node.className.split(/\s+/);

		for (var i = 0, l = n.length; i < l; i++) {
			if (n[i] == classname)
				return;
		}
		n.push(classname);
		node.className = n.join(" ");
	},

	removeCSSClass: function(node, classname, toggle) {
		var n = node.className.split(/\s+/);

		for (var i = 0, l = n.length; i < l; i++) {
			if (n[i] == classname) {
				if (l == 1)
					node.className = "";
				else {
					n.splice(i, i);
					node.className = n.join(" ");
				}
				return;
			}
		}

		if (toggle) {
			n.push(classname);
			node.className = n.join(" ");
		}
	},

	toggleCSSClass: function(node, classname) {
		this.removeCSSClass(node, classname, true);
	},
	
	create: function(tag, style) {
		if (!this.enabled)
			return null;

		var o = document.createElement(tag);
		
		if (style)
			this.setStyle(o, style);
		
		return o;
	},
	
	setStyle: function(node, style) {
		if (typeof style === "string") {
			node.className = style;
		}
		else if (typeof style === "object") {
			for (var i in style) {
				switch (i) {
				case "id":
				case "className":
					node[i] = style[i];
					break;
				default:
					node.style[i] = style[i];
				}
			}
		}
		else if (typeof style !== "undefined") {
			throw("joDOM.setStyle(): unrecognized type for style argument; must be object or string.");
		}
	},
	
	applyCSS: function(style, oldnode) {
		// TODO: should insert before and then remove the old node
		if (oldnode)
			document.body.removeChild(oldnode);

		var css = joDOM.create('jostyle');
		css.innerHTML = "<style>" + style + "</style>";

		document.body.appendChild(css);

		return css;
	},
	
	loadCSS: function(filename, oldnode) {
		// you can just replace the source for a given
		// link if one is passed in
		if (oldnode)
			var css = oldnode;
		else
			var css = joDOM.create('link');
		
		css.rel = 'stylesheet';
		css.type = 'text/css';
		css.href = filename;

		document.body.appendChild(css);
		
		return css;
	}		
};
