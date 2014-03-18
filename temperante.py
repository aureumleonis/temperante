from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def view_index():
	return render_template(
		'index.html')

if __name__ == '__main__':
	app.run(host='0.0.0.0', debug=True, threaded=True)