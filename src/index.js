const random = Math.random;

function Fragual_2U(q, m, f) {
	this.quantile = q;
	this.estimate = m ? m:0;
	//default step function is *1;
	this.step_func = f ? f : x =>x;
	

	this.step = 1;
	this.sign = 1;

}

// inserts a value into the quantile stream and do the calc
Fragual_2U.prototype.insert = function(item) {
	// if item is above the current estimate 
	if (item > this.estimate && random() > 1 - this.quantile) {
		this.step += this.step_func(this.step) * this.sign;
		// Increment the estimate by step size if step is positive. Otherwise,
		// increment the step size by one.
		this.estimate += this.step > 0 ? this.step : 1;
		// Mark that the estimate increased this step
		this.sign = 1;
		//keeo the estimate not over the current item: if overshot , pull it back
		if (this.estimate > item) {
			this.step += item - this.estimate;
			this.estimate = item;
		}

	}
	// If the item is less than the stream, follow all of the same steps as
	// above, with signs reversed.
	else if (item < this.estimate && random() > this.quantile) {
		this.step += this.step_func(this.step) * this.sign * -1;
		this.estimate -= this.step > 0 ? this.step : 1;
		this.sign = -1;
		if (this.estimate < item) {
			this.step -= this.estimate - item;
			this.estimate = item;
		}

	}
	// Damp down the step size to avoid oscillation.
	if ((this.estimate - item) * this.sign < 0 && this.step > 1) {
		this.step = 1
	}
}
// returns the current estimated value for the quantile
Fragual_2U.prototype.estimater = function() {
	return this.estimate;
}

exports.Fragual_2U = Fragual_2U;