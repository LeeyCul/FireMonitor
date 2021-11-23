import { Form, Input, Button } from 'antd';
import { useDispatch } from 'umi';
import styles from './style.less';

function Login() {
  const dispath = useDispatch();

  const onFinish = (values: any) => {
    dispath({ type: 'login/loginIn', payload: values });
  };

  return (
    <div className={styles.loginFrom}>
      <div className={styles.title}>请登录</div>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input
            className={styles.inputSty}
            prefix={<span className={styles.inputText}>用户名：</span>}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
          style={{ background: '#fff' }}
        >
          <Input.Password
            className={styles.inputSty}
            prefix={<span className={styles.inputText}>密&emsp;码：</span>}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.loginBtn}>
            立即登陆
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
