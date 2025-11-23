/**
 * Export Service
 * Handles CSV and PDF export
 */

import { dataRepository } from '@/data/services';
import { jsPDF } from 'jspdf';
import type { Income, Expense } from '@/core/types';
import { formatCurrency } from '@/core/utils';
import { format } from 'date-fns';

export class ExportService {
  /**
   * Export data to CSV
   */
  async exportToCSV(type: 'income' | 'expenses' | 'all'): Promise<string> {
    let data: (Income | Expense)[] = [];
    let headers: string[] = [];

    if (type === 'income' || type === 'all') {
      const incomes = await dataRepository.getAllIncomes();
      data = [...data, ...incomes];
      if (headers.length === 0) {
        headers = ['Type', 'Date', 'Amount', 'Source/Category', 'Notes'];
      }
    }

    if (type === 'expenses' || type === 'all') {
      const expenses = await dataRepository.getAllExpenses();
      data = [...data, ...expenses];
      if (headers.length === 0) {
        headers = ['Type', 'Date', 'Amount', 'Category', 'Tags', 'Notes'];
      }
    }

    // Sort by date
    data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Create CSV content
    const csvRows = [
      headers.join(','),
      ...data.map(item => {
        if ('source' in item) {
          // Income
          return [
            'Income',
            item.date,
            item.amount.toString(),
            item.source,
            item.notes || '',
          ].join(',');
        } else {
          // Expense
          return [
            'Expense',
            item.date,
            item.amount.toString(),
            item.categoryId,
            item.tags.join(';'),
            item.notes || '',
          ].join(',');
        }
      }),
    ];

    return csvRows.join('\n');
  }

  /**
   * Export data to PDF
   */
  async exportToPDF(type: 'income' | 'expenses' | 'all'): Promise<Blob> {
    const doc = new jsPDF();
    let yPos = 20;

    // Title
    doc.setFontSize(18);
    doc.text('Chk2Chk Export', 14, yPos);
    yPos += 10;

    doc.setFontSize(12);
    doc.text(`Export Date: ${format(new Date(), 'MMM dd, yyyy')}`, 14, yPos);
    yPos += 15;

    if (type === 'income' || type === 'all') {
      const incomes = await dataRepository.getAllIncomes();
      doc.setFontSize(14);
      doc.text('Income', 14, yPos);
      yPos += 10;

      doc.setFontSize(10);
      incomes.forEach(income => {
        if (yPos > 280) {
          doc.addPage();
          yPos = 20;
        }
        doc.text(
          `${format(new Date(income.date), 'MMM dd, yyyy')} - ${income.source} - ${formatCurrency(income.amount)}`,
          14,
          yPos
        );
        yPos += 7;
      });
      yPos += 5;
    }

    if (type === 'expenses' || type === 'all') {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      const expenses = await dataRepository.getAllExpenses();
      doc.setFontSize(14);
      doc.text('Expenses', 14, yPos);
      yPos += 10;

      doc.setFontSize(10);
      expenses.forEach(expense => {
        if (yPos > 280) {
          doc.addPage();
          yPos = 20;
        }
        doc.text(
          `${format(new Date(expense.date), 'MMM dd, yyyy')} - ${formatCurrency(expense.amount)}`,
          14,
          yPos
        );
        yPos += 7;
      });
    }

    return doc.output('blob');
  }

  /**
   * Download CSV file
   */
  async downloadCSV(type: 'income' | 'expenses' | 'all'): Promise<void> {
    const csv = await this.exportToCSV(type);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chk2chk-export-${type}-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /**
   * Download PDF file
   */
  async downloadPDF(type: 'income' | 'expenses' | 'all'): Promise<void> {
    const blob = await this.exportToPDF(type);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chk2chk-export-${type}-${format(new Date(), 'yyyy-MM-dd')}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

export const exportService = new ExportService();

