import { getString } from 'presentation/theme/localization';

interface Installment {
  id: number;
  value: string;
  displayName: string;
}

export default function getInstallmentData(data: Array<any>) {
  const listInstallment: Array<Installment> = data.map((item: any) => {
    const { installments } = item;
    return {
      id: installments,
      value: installments,
      displayName:
        installments === 1
          ? `${getString('text.installment', {
              installmentNumber: installments,
            })}`
          : `${getString('text.installments', {
              installmentNumber: installments,
            })}`,
    };
  });

  return listInstallment;
}
