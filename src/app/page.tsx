import LoginForm from "../components/LoginForm";

export default function Home() {
  return (
    <div className="glass-card flex p-12 items-center justify-center gap-2 flex-col">
      <p className="text-step-3">Login</p>
      <LoginForm/>
    </div>
  )
}
