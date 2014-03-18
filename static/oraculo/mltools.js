/* 
 * Machine learning tools (stats, arrays)
 * @module mltools
 */

// @namespace mltools
var mltools = new function() {
	/* Computes the mean of an array
	 * @namespace mltools
	 */
	this.mean = function(points) {
		var sum = 0;
		for (var i = 0; i < points.length; i++) {
			sum += points[i];
		}
		return sum/points.length;
	};

	/* Computes the standard deviation of an array
	 * @namespace mltools
	 */
	this.stddev = function (points) {
		var sqsum = 0;
		var mu = this.mean(points);
		for (var i = 0; i < points.length; i++) {
			sqsum += Math.pow(mu - points[i], 2);
		}
		if (points.length <= 1) return Math.sqrt(sqsum);
		else return Math.sqrt(sqsum/(points.length-1))
	};

	/* Computes the max of an array
	 * @namespace mltools
	 */
	this.max = function (items) {
		if (items.length == 0) return null;
		else {
			var mx = items[0];
			for (var i = 1; i < items.length; i++) {
				if (items[i] > mx) mx = items[i];
			}
			return mx;
		}
	};

	/* Computes the min of an array
	 * @namespace mltools
	 */
	this.min = function (items) {
		if (items.length == 0) return null;
		else {
			var mx = items[0];
			for (var i = 1; i < items.length; i++) {
				if (items[i] < mx) mx = items[i];
			}
			return mx;
		}	
	};

	/* Computes the range of an array
	 * @namespace mltools
	 */
	this.range = function(items) {
		return this.max(items)-this.min(items);
	};

	/* Iterates through all the slices of an array containing the 
	 * center index
	 * @class PivotSlicer
	 * @constructor
	 * @namespace mltools
	 */
	this.PivotSlicer = function (items, center) {
		this.items = items;
		this.center = center;
	};

	/* Iterator function
	 * @class PivotSlicer
	 * @method
	 * @namespace mltools
	 */
	this.PivotSlicer.prototype.each = function(process) {
		for (var i = 2; i <= this.items.length; i++) {
			var r = this.center-i+1;
			if (r < 0) r = 0;
			for (var j = r; j < this.center+1; j++) {
				var l = j+i;
				if (l > this.items.length) break;
				process(this.items.slice(j,l));
			}
		}
	};

	/* Finds a crest of items ranging within the threshold
	 * @namespace mltools
	 */
	this.find_crest = function(items, threshold) {
		var peak = this.max(items);
		var c = items.indexOf(peak);
		var select = [peak];
		var slicer = new this.PivotSlicer(items,c);
		var self = this;
		slicer.each(function(sub) {
			if (self.range(sub) < threshold) select = sub;
		});
		return select;
	};

	/* Constant used in normal
	 * @namespace mltools
	 */
	var SQRT2PI = Math.sqrt(2*Math.PI);

	/* Computes a normal distribution N(mu, sigma, x)
	 * @namespace mltools
	 */
	this.N = function(m, s, x) {
		return Math.exp(Math.pow(x-m,2)/(-2*s*s)) / (s*SQRT2PI);
	};
};
