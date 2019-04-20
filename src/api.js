import ModelCards from './module-cards';

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const OK_STATUS = 200;
const OK_STATUS_RANGE = 100;

const toJson = (response) => {
  return response.json();
};

const checkStatus = (response) => {
  if (response.status >= OK_STATUS && response.status < OK_STATUS + OK_STATUS_RANGE) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class Api {
  constructor({endPoint, authorization}) {
    this._endPoint = endPoint;
    this._autorization = authorization;
  }

  getCards() {
    return this._load({url: `movies`})
      .then(toJson)
      .then(ModelCards.parseCards);
  }

  updateCard({id, data}) {
    return this._load({
      url: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(toJson)
      .then(ModelCards.parseCard);
  }


  _load({url, method = Method.GET, body = null, headers = new Headers()}) {

    headers.append(`Authorization`, this._autorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}
