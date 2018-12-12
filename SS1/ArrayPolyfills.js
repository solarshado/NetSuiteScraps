if (!Array.prototype.forEach)
	Array.prototype.forEach = function(f) {
		var t = this, l = this.length, i = 0;
		for (; i < l; ++i)
			f(t[i],i,t);
	};

if (!Array.prototype.map)
	Array.prototype.map = function(f) {
		var r = [];
		this.forEach(function(e,i,a) {
			r.push(f(e,i,a));
		});
		return r;
	};

if (!Array.prototype.filter)
	Array.prototype.filter = function(f) {
		var r = [];
		this.forEach(function(e,i,a) {
			if (f(e,i,a))
				r.push(e);
		});
		return r;
	};
