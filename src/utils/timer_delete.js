const deleteDaily = require("../routes/cron_delete.routes");

class ManagerCron {
	constructor() {
		this.jobs = [deleteDaily];
	}
	run() {
		this.jobs.forEach((job) => job.start());
	}
}

module.exports = new ManagerCron();