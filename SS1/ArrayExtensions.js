if (!Array.prototype.toDict)
	/** Requires Array.forEach, either via polyfill or native */
	Array.prototype.toDict = function(fk, fv) {
		var haveFv = !!fv && (typeof fv === "function"), r = {};

		this.forEach(function(e) {
			var k = fk(e);
			if (k in r)
				throw new Error("Duplicate key: " + k);
			r[k] = haveFv ? fv(e) : e;
		});

		return r;
	};

if (!Array.prototype.toLookup)
	/** Requires Array.forEach, either via polyfill or native */
	Array.prototype.toLookup = function(fk, fv) {
		var haveFv = !!fv && (typeof fv === "function"), r = {};

		this.forEach(function(e) {
			var k = fk(e), v = haveFv ? fv(e) : e;
			if (k in r)
				r[k].push(v);
			else
				r[k] = [v];
		});

		return r;
	};
