interface IMailConfig {
    driver: 'ethereal' | 'ses';
  
    defaults: {
      from: {
        email: string;
        name: string;
      };
    };
  }
  
  export default {
    driver: process.env.MAIL_DRIVER || 'ethereal',
  
    defaults: {
      from: {
        email: 'mecz@mecz.com.br',
        name: 'Luan Alfredo da Mecz',
      },
    },
  } as IMailConfig;