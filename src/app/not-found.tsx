import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <head>
        <title>404 – Page Not Found | Rammer Tech</title>
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
            transition: background 0.15s;
          }
          .btn:hover { background: #611414; }
          .divider {
            width: 3rem;
            height: 3px;
            background: #8B1A1A;
            border-radius: 2px;
            margin: 1.25rem auto;
          }
        `}</style>
      </head>
      <body>
        <div className="container">
          <div className="code">404</div>
          <div className="divider" />
          <h1 className="title">Page Not Found</h1>
          <p className="description">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Head back to the homepage to find what you need.
          </p>
          <Link href="/ro" className="btn">
            ← Back to Homepage
          </Link>
        </div>
      </body>
    </html>
  );
}
