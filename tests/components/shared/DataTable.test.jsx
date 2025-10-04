import React from 'react';
import { describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react';
import DataTable from '../../../src/components/shared/DataTable';

describe('DataTable', () => {
  const columns = ['Name', 'Age', 'Email'];
  const data = [
    { key: 1, Name: 'Alice', Age: 25, Email: 'alice@example.com' },
    { key: 2, Name: 'Bob', Age: 30, Email: 'bob@example.com' },
  ];

  it('renders table headers', () => {
    render(<DataTable columns={columns} data={[]} />);
    columns.forEach((col) => {
      expect(screen.getByText(col)).toBeInTheDocument();
    });
  });

  it('renders table rows and cells', () => {
    render(<DataTable columns={columns} data={data} />);
    data.forEach((row) => {
      columns.forEach((col) => {
        expect(screen.getByText(row[col])).toBeInTheDocument();
      });
    });
  });

  it('renders empty table body when data is empty', () => {
    render(<DataTable columns={columns} data={[]} />);
    // Only header row should be present
    expect(screen.queryByText('Alice')).not.toBeInTheDocument();
    expect(screen.queryByText('Bob')).not.toBeInTheDocument();
  });

  it('renders nothing when columns is empty', () => {
    render(<DataTable columns={[]} data={data} />);
    expect(screen.queryByRole('columnheader')).not.toBeInTheDocument();
    expect(screen.queryByRole('cell')).not.toBeInTheDocument();
  });

  it('uses row.key or row.id as key', () => {
    const dataWithId = [
      { id: 'row1', Name: 'Charlie', Age: 22, Email: 'charlie@example.com' },
    ];
    render(<DataTable columns={columns} data={dataWithId} />);
    expect(screen.getByText('Charlie')).toBeInTheDocument();
  });
});