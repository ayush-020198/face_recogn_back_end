const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '910551bcdd65408682a060a24fd5d609'
});

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('Unable to get Entries'))
}

const handleAPIcall = (req, res) => {
app.models
.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
.then(data => {
	res.json(data);
})
.catch(err => res.status(400).json('Unable to work with API'))
}

module.exports = {
	handleImage,
	handleAPIcall
};