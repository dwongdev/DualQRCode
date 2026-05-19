import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

const ABOUT_TITLE = 'About | Dual-Link QR Code Generator'

export default function About() {
  useEffect(() => {
    document.title = ABOUT_TITLE
  }, [])

  return (
    <main className="about-main">
      <article className="about-content panel">
        <h2 className="panel-title">About dual-link QR codes</h2>

        <section className="about-section">
          <h3>What it is</h3>
          <p>
            This tool creates a single QR code image that can decode to either of two different URLs,
            depending on how you scan it. It is an experimental proof of concept. It breaks the QR
            code standard and should not be used for production or safety-critical applications.
          </p>
        </section>

        <section className="about-section">
          <h3>How generation works</h3>
          <p>
            When you generate a code, the app builds two separate QR codes in your browser: one for
            each URL. Both use the same QR version and error correction level H (high).
          </p>
          <ol className="about-steps">
            <li>
              Enter two URLs. The app picks the smallest QR version that fits both payloads, and
              bumps the version up automatically if either URL needs more capacity.
            </li>
            <li>
              For every module (pixel) in the grid, the app compares the two codes. If both agree
              (both dark or both light), it draws one solid square in that color.
            </li>
            <li>
              If the two codes disagree at that position, the module is split. One part shows URL
              1&apos;s bit and the other part shows URL 2&apos;s bit.
            </li>
            <li>
              You choose how disagreeing modules are split: vertical (left and right halves),
              horizontal (top and bottom halves), or diagonal (two triangles).
            </li>
            <li>
              &quot;Invert pixel splitting&quot; swaps which URL is drawn on which side of each
              split module.
            </li>
          </ol>
          <p>
            The result is one PNG you can download. Shared finder patterns, timing patterns, and
            other structure come from using the same version for both underlying codes.
          </p>
        </section>

        <section className="about-section">
          <h3>How scanning works</h3>
          <p>
            QR readers treat each module as black or white. A split module is ambiguous: the reader
            may lean toward one half depending on distance, focus, perspective, and internal
            heuristics. Try scanning from different angles and distances if one URL does not appear.
          </p>
          <p>
            Level H error correction adds redundancy, which helps scanners tolerate the merged
            image, but results still vary by app and device. Many readers tend to favor one URL more
            often than the other.
          </p>
        </section>

        <section className="about-section">
          <h3>Privacy</h3>
          <p>
            All encoding and image rendering run in your browser. URLs are not sent to a server for
            generation.
          </p>
        </section>

        <section className="about-section">
          <h3>Credit</h3>
          <p>
            The idea was inspired by{' '}
            <a
              href="https://mstdn.social/@isziaui/113874436953157913"
              target="_blank"
              rel="noopener noreferrer"
            >
              Christian Walther
            </a>
            .
          </p>
        </section>

        <p className="about-cta">
          <Link to="/" className="btn-primary about-cta-link">
            Open the generator
          </Link>
        </p>
      </article>
    </main>
  )
}
