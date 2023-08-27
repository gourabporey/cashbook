const sendJsonRequest = (url, options, onResponse) => {
  fetch(url, options)
    .then((res) => res.json())
    .then(onResponse);
};

const sendEntry = (entry, onResponse) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(entry),
    headers: { 'content-type': 'application/json' },
  };

  sendJsonRequest('/entries', options, onResponse);
};

const getAllEntries = (onResponse) => {
  sendJsonRequest('/entries', null, onResponse);
};

const deleteEntryOfId = (id, onResponse) => {
  fetch(`/entries/${id}`, { method: 'DELETE' }).then(onResponse);
};
