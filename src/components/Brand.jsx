import logo from '../assets/logo.svg'

export default function Brand({ size = 28 }) {
  return (
    <div className="flex items-center gap-2">
      <img src={logo} alt="" style={{ height: size }} />
      <span className="font-display font-semibold text-lg tracking-tight">PeerUp</span>
    </div>
  )
}