from flask import Flask,render_template
from websockets im
# from sense_hat import SenseHat

app = Flask(__name__,
                    template_folder="../react-display/build",
                    static_folder="../react-display/build/static")


@app.route('/')
def home():
   return render_template('index.html')


@app.route('/update')
def update_handler():
   pass

if __name__ == '__main__':
    app.run(port=8765,debug=True)