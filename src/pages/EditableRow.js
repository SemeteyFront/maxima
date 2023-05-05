import {Form} from 'antd'

export const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
        <tr {...props} />
    </Form>
  );
};