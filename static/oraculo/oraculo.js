/*
 * Weather risk prediction with time<->location learning
 * @module oraculo
 */

//@namespace oraculo
var oraculo = new function() {
	this.riskmodel = function(condition, forecast) {
		if (condition === 'wind' && forecast.hasOwnProperty('windSpeed')) {
			var speed = parseFloat(forecast['windSpeed']);
			if (speed > 40) return 1;
			else return speed/40.0;
		}
		else if (condition === 'visibility' && forecast.hasOwnProperty('visibility')) {
			var vis = parseFloat(forecast['visibility']);
			if (vis >= 7) return 0;
			else return (-1*vis/7.0)+1;
		}
		return null;
	};

	this.forecast_time = function(forecast) {
		return new Date(parseFloat(forecast['time'])*1000);
	};

	var slice_if_less = function(items, pivot, reversed) {
		reversed = typeof reversed !== 'undefined' ? reversed : false;
		if (!reversed) {
			for (var i = 0; i < items.length; i++) {
				if (items[i] > pivot) return items.slice(0,i);
			}
		} else {
			for (var i = items.length - 1; i >= 0; i--) {
				if (items[i] < pivot) return items.slice(i+1,items.length);
			}
		}
	};

	this.classify_hours = function(timeplaces) {
		var mplace = [null,24];
		var nplace = [null,24];
		for (var i = 0; i < timeplaces.length; i++) {
			var tp = timeplaces[i];
			var mu = mltools.mean(tp.times);
			var mul = mltools.mean(slice_if_less(tp.times, mu));
			var mur =  mltools.mean(slice_if_less(tp.times, mu, true));
			var mum  = (mul+24-mur)/2;
			var mue = (mur-mul)/2;
			if (mum < mplace[1]) mplace = [tp,mum];
			if (mue < nplace[1]) nplace = [tp,mue];
		}
		return {'home': mplace[0], 'away': nplace[0]};
	};
};