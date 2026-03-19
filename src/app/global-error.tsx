"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <head>
        <title>500 – Server Error | Rammer Tech</title>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: system-ui, -apple-system, sans-serif;
            background: #fafaf9;
            color: #1c1917;
            min-height: 100dvh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .container {
            text-align: center;
            padding: 2rem 1.5rem;
            max-width: 480px;
          }
          .code {
            font-size: clamp(5rem, 20vw, 8rem);
            font-weight: 800;
            line-height: 1;
            color: #8B1A1A;
            letter-spacing: -0.04em;
          }
          .title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-top: 1rem;
            margin-bottom: 0.5rem;
          }
          .description {
            color: #78716c;
            line-height: 1.6;
            margin-bottom: 2rem;
          }
          .divider {
            width: 3rem;
            height: 3px;
            background: #8B1A1A;
            border-radius: 2px;
            margin: 1.25rem auto;
          }
          .actions {
            display: flex;
            gap: 0.75rem;
            justify-content: center;
            flex-wrap: wrap;
          }
          .btn {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            background: #8B1A1A;
            color: #fff;
            text-decoration: none;
            padding: 0.65rem 1.5rem;
            border-radius: 0.5rem;
            font-weight: 500;
            font-size: 0.95rem;
            border: none;
            cursor: pointer;
            transition: background 0.15s;
          }
          .btn:hover { background: #611414; }
          .btn-outline {
            background: transparent;
            color: #8B1A1A;
            border: 1.5px solid #8B1A1A;
          }
          .btn-outline:hover { background: #fee2e2; }
        `}</style>
      </head>
      <body>
        <div className="container">
          <div className="code">500</div>
          <div className="divider" />
          <h1 className="title">Something Went Wrong</h1>
          <p className="description">
            An unexpected error occurred on our server. We&apos;ve been
            notified and are working to fix it. Please try again in a moment.
          </p>
          <div className="actions">
            <button onClick={reset} className="btn">
              Try Again
            </button>
            <a href="/ro" className="btn btn-outline">
              ← Back to Homepage
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
