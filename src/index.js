const random = Math.random();

function Fragual_2U(q, m, f) {
	this.quantile = q;
	this.estimate = m;
	this.step_func = f;

	this.step = 1;
	this.sign = 1;

}

// inserts a value into the quantile stream and do the calc
Fragual_2U.prototype.insert = function(item) {
	// if item is above the current estimate 
	if (item > this.m && random() > 1 - this.quantile) {
		this.step += this.f(this.step) * this.sign;
		// Increment the estimate by step size if step is positive. Otherwise,
		// increment the step size by one.
		this.m += this.step > 0 ? this.step : 1;
		// Mark that the estimate increased this step
		this.sign = 1;
		//keeo the estimate not over the current item: if overshot , pull it back
		if (this.m > item) {
			this.step += item - this.m;
			this.m = item;
		}

	}
	// If the item is less than the stream, follow all of the same steps as
	// above, with signs reversed.
	else if (item < this.m && random() > this.quantile) {
		this.step += this.f(this.step) * this.sign * -1;
		this.m -= this.step > 0 ? this.step : 1;
		this.sign = -1;
		if (this.m < item) {
			this.step -= this.m - item;
			this.m = item;
		}

	}
	// Damp down the step size to avoid oscillation.
	if ((this.m - item) * this.sign < 0 && this.step > 1) {
		this.step = 1
	}
}
// returns the current estimated value for the quantile
Fragual_2U.prototype.estimate = function() {
	return this.m;
}

exports.Fragual_2U = Fragual_2U;