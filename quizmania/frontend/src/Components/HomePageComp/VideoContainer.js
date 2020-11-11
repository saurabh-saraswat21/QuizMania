import React from 'react'
import '../../stylesheets/VideoContainer.css'

function VideoContainer() {
    return (
        <div class="video-container">
            <video src="/videos/video-1.mp4" autoPlay loop muted/>
        </div>
    )
}

export default VideoContainer
