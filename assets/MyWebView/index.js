import RNMsgChannel from 'react-native-webview-messaging';

RNMsgChannel.on('text', text => console.log(text));
RNMsgChannel.on('json', json => console.log(json));
RNMsgChannel.on('custom-event-from-rn', data => console.log(data));

RNMsgChannel.send('plain text from WebView');
RNMsgChannel.sendJSON({
  payload: 'JSON from WebView'
});

RNMsgChannel.emit('custom-event-from-webview', { payload: 'Custom event from WebView' })