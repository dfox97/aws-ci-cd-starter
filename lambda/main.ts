export const handler = async (
  event: any,
  context: any,
): Promise<any> => {
  try {
    const version = process.env.VERSION || '1.0.0';

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Hello from Lambda! Version: ${version}`,
        input: {
          path: event.path,
          method: event.httpMethod,
        },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } catch (error) {
    console.error('Error in Lambda handler:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};

