import Image from 'next/image'

const Login = () => {
  const handleLoginClick = () => {
    console.log('Login Clicked')
  }

  return (
    <button onClick={handleLoginClick}>
      <Image
        src="/icon_kakao_login.png"
        alt="KakaoLogin"
        width={150}
        height={150}
      />
    </button>
  )
}

export default Login
