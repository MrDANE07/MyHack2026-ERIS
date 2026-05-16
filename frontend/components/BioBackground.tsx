'use client'

export function BioBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050810] via-[#0a0f1a] to-[#050810] dark:opacity-100 opacity-0" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#f0f4f8] via-[#e8eef5] to-[#f0f4f8] dark:opacity-0 opacity-100" />

      {/* Radial color spots */}
      <div className="absolute inset-0 dark:opacity-100 opacity-30">
        <div className="absolute top-[10%] left-[15%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,_hsla(166,100%,50%,0.12)_0%,_transparent_60%)]" />
        <div className="absolute top-[40%] right-[10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,_hsla(275,100%,69%,0.1)_0%,_transparent_60%)]" />
        <div className="absolute bottom-[15%] left-[30%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,_hsla(335,85%,65%,0.08)_0%,_transparent_60%)]" />
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0">
        {/* Large teal orb */}
        <div
          className="absolute w-[350px] h-[350px] rounded-full opacity-60 dark:opacity-60 animate-float"
          style={{
            top: '8%',
            left: '12%',
            background: 'radial-gradient(circle, hsla(166, 100%, 50%, 0.25) 0%, transparent 65%)',
            filter: 'blur(40px)',
            animationDuration: '25s',
          }}
        />

        {/* Medium violet orb */}
        <div
          className="absolute w-[280px] h-[280px] rounded-full opacity-50 dark:opacity-50 animate-float"
          style={{
            top: '45%',
            right: '18%',
            background: 'radial-gradient(circle, hsla(275, 100%, 69%, 0.2) 0%, transparent 65%)',
            filter: 'blur(35px)',
            animationDuration: '20s',
            animationDelay: '-8s',
          }}
        />

        {/* Rose orb */}
        <div
          className="absolute w-[200px] h-[200px] rounded-full opacity-40 dark:opacity-40 animate-float"
          style={{
            bottom: '20%',
            left: '25%',
            background: 'radial-gradient(circle, hsla(335, 85%, 65%, 0.18) 0%, transparent 65%)',
            filter: 'blur(30px)',
            animationDuration: '18s',
            animationDelay: '-12s',
          }}
        />

        {/* Extra teal accent */}
        <div
          className="absolute w-[180px] h-[180px] rounded-full opacity-35 dark:opacity-35 animate-float"
          style={{
            top: '65%',
            left: '60%',
            background: 'radial-gradient(circle, hsla(166, 100%, 50%, 0.15) 0%, transparent 65%)',
            filter: 'blur(25px)',
            animationDuration: '22s',
            animationDelay: '-5s',
          }}
        />

        {/* Extra violet accent */}
        <div
          className="absolute w-[220px] h-[220px] rounded-full opacity-30 dark:opacity-30 animate-float"
          style={{
            top: '20%',
            right: '35%',
            background: 'radial-gradient(circle, hsla(275, 100%, 69%, 0.12) 0%, transparent 65%)',
            filter: 'blur(30px)',
            animationDuration: '28s',
            animationDelay: '-15s',
          }}
        />
      </div>

      {/* Circuit trace lines */}
      <svg className="absolute inset-0 w-full h-full dark:opacity-30 opacity-15" preserveAspectRatio="none">
        <defs>
          <linearGradient id="circuit-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="20%" stopColor="hsl(166, 100%, 50%)" stopOpacity="0.5" />
            <stop offset="50%" stopColor="hsl(275, 100%, 69%)" stopOpacity="0.3" />
            <stop offset="80%" stopColor="hsl(166, 100%, 50%)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="circuit-gradient-2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="30%" stopColor="hsl(275, 100%, 69%)" stopOpacity="0.4" />
            <stop offset="70%" stopColor="hsl(335, 85%, 65%)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* Horizontal traces */}
        <line x1="0" y1="25%" x2="100%" y2="25%" stroke="url(#circuit-gradient-1)" strokeWidth="1" />
        <line x1="0" y1="75%" x2="100%" y2="75%" stroke="url(#circuit-gradient-1)" strokeWidth="1" />

        {/* Vertical traces */}
        <line x1="20%" y1="0" x2="20%" y2="100%" stroke="url(#circuit-gradient-2)" strokeWidth="1" />
        <line x1="80%" y1="0" x2="80%" y2="100%" stroke="url(#circuit-gradient-2)" strokeWidth="1" />
      </svg>
    </div>
  )
}
