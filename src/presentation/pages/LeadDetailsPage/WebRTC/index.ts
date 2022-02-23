let myPeerConnection: any = null;
let transceiver: any = null; // RTCRtpTransceiver
let webcamStream: MediaStream | null; // MediaStream from webcam

const mediaConstraints = {
  audio: true,
};

// Close the peer connection
export function closePeerConnection() {
  if (myPeerConnection) {
    myPeerConnection.close();
    myPeerConnection = null;
    webcamStream = null;
  }
}

export function getPeerConnection() {
  return myPeerConnection;
}

export async function startPeerConnection(handleTrackEvent: any) {
  myPeerConnection = new RTCPeerConnection();
  myPeerConnection.ontrack = handleTrackEvent;

  webcamStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);

  // Add the tracks from the stream to the RTCPeerConnection
  webcamStream
    .getTracks()
    .forEach(
      (transceiver = (track: any) =>
        myPeerConnection.addTransceiver(track, { streams: [webcamStream] }))
    );

  const offer = await myPeerConnection.createOffer();
  await myPeerConnection.setLocalDescription(offer);
}

export async function handleAudioAnswer(message: any) {
  const desc = new RTCSessionDescription({ type: 'answer', sdp: message.sdp });

  await myPeerConnection.setRemoteDescription(desc);
}
