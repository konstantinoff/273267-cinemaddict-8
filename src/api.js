import ModelCards from './module-cards';

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const toJSON = (response) => {
  return response.json();
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class API {
  constructor({endPoint, authorization}) {
    this._endPoint = endPoint;
    this._autorization = authorization;
  }

  getCards() {
    return this._load({url: `movies`})
      .then(toJSON)
      .then(ModelCards.parseCards);
  }

  createCard({card}) {
    return this._load({
      url: `cards`,
      method: Method.POST,
      body: JSON.stringify(card),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(toJSON)
      .then(ModelCards.parseCard);
  }

  updateCard({id, data}) {
    return this._load({
      url: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(toJSON)
      .then(ModelCards.parseCard);
  }
  deleteCard({id}) {
    return this._load({url: `cards/${id}`, method: Method.DELETE});
  }


  _load({url, method = Method.GET, body = null, headers = new Headers()}) {

    headers.append(`Authorization`, this._autorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        console.error(`fetch error: ${err}`);
        throw err;
      });
  }
}
