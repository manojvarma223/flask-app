import json
import pickle
import numpy as np
import pandas as pd
from flask import Flask, request, render_template

app = Flask(__name__)

# Constants
MODEL_PICKLE_FILEPATH = 'models/model.pkl'
EXPECTED_COLUMNS_IN_ORDER = ['Weight','Length1','Length2','Length3','Height','Width']


class_names = np.array(['Bream', 'Parkki', 'Perch', 'Pike', 'Roach', 'Smelt', 'Whitefish'])

def load_model():

    model_file = open(MODEL_PICKLE_FILEPATH, 'rb')
    model = pickle.load(model_file)
    model_file.close()

    return model

@app.route("/")
def display_form():
    return render_template('index.html')

@app.route('/predict',methods=['POST'])
def predict():
    int_features = [float(x) for x in request.form.values()]
    final_features = [np.array(int_features)]
    classifier = load_model()
    prediction = classifier.predict(final_features)
    predicted_class = class_names[prediction]

    return 'The predicted class is <b> {} </b>'.format(predicted_class[0])

if __name__ == "__main__":
    app.run(debug=True)