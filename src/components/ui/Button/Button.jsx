import { ConfigProvider, Button } from "antd"

function ButtonConfig({children, onClick}) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#5D3891',
          borderRadius: '10px',
        }
      }}
    >
      <Button onClick={onClick} type="primary">{children}</Button>
    </ConfigProvider>
  )
}

export default ButtonConfig
