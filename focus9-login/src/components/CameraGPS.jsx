// src/components/CameraGPS.js
import React, { useState, useEffect, useRef } from "react";

const CameraGPS = ({ onCapture, maxPhotos = 2 }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [cameraOn, setCameraOn] = useState(false);
  const [photos, setPhotos] = useState([]); // base64 images
  const [gps, setGps] = useState(null);
  const [error, setError] = useState("");
  const [facingMode, setFacingMode] = useState("environment"); // back camera

  /* ---------------- GPS (FAST) ---------------- */
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }

    // Fast GPS: Use cached position first, then update in background
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setGps({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      () => setError("GPS permission required"),
      {
        enableHighAccuracy: false,  // Fast mode - no survey-level accuracy needed
        timeout: 5000,               // 5 second timeout
        maximumAge: 300000,          // Use cache if available (5 minutes old)
      }
    );
  }, []);

  /* ---------------- CAMERA ---------------- */
  const startCamera = async () => {
    setError("");

    if (!navigator.mediaDevices?.getUserMedia) {
      setError("Camera not supported");
      return;
    }

    stopCamera(); // Stop any existing camera first

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        try {
          await videoRef.current.play();
        } catch (playErr) {
          console.warn("Video play interrupted:", playErr);
        }
        setCameraOn(true);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraOn(false);
  };

  /* Restart camera whenever facingMode changes */
  useEffect(() => {
    if (cameraOn) {
      startCamera();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facingMode]);

  const switchCamera = () => {
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
  };

  const capturePhoto = () => {
    if (!cameraOn || photos.length >= maxPhotos) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    const base64 = canvas.toDataURL("image/jpeg", 0.8);

    const updated = [...photos, base64];
    setPhotos(updated);

    if (onCapture) onCapture({ photos: updated, gps });

    if (updated.length >= maxPhotos) stopCamera();
  };

  const removePhoto = (index) => {
    const updated = photos.filter((_, i) => i !== index);
    setPhotos(updated);
    if (onCapture) onCapture({ photos: updated, gps });
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Camera View */}
      <video
        ref={videoRef}
        playsInline
        muted
        style={{
          display: cameraOn ? "block" : "none",
          width: "100%",
          marginBottom: 10,
          borderRadius: 6,
        }}
      />

      {/* Controls */}
      {photos.length < maxPhotos && (
        <>
          {!cameraOn && (
            <button className="btn btn-secondary mb-2" onClick={startCamera}>
              Open Camera
            </button>
          )}
          {cameraOn && (
            <div className="mb-2">
              <button className="btn btn-success me-2" onClick={capturePhoto}>
                Capture
              </button>
              <button className="btn btn-danger" onClick={stopCamera}>
                Cancel
              </button>
            </div>
          )}
        </>
      )}

      {/* Photo Preview */}
      {photos.length > 0 && (
        <div className="d-flex gap-2 flex-wrap mb-2">
          {photos.map((img, idx) => (
            <div key={idx} style={{ position: "relative" }}>
              <img
                src={img}
                alt="preview"
                style={{
                  width: 80,
                  height: 80,
                  objectFit: "cover",
                  borderRadius: 4,
                  border: "1px solid #ccc",
                }}
              />
              <button
                type="button"
                className="btn btn-sm btn-danger"
                style={{ position: "absolute", top: -5, right: -5 }}
                onClick={() => removePhoto(idx)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* GPS */}
      <div className="mb-2">
        <label>GPS</label>
        <input
          type="text"
          disabled
          className="form-control"
          value={gps ? `${gps.lat}, ${gps.lng}` : "Fetching..."}
        />
      </div>

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default CameraGPS;