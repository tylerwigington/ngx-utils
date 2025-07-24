import { FileSizePipe } from './file-size.pipe';

describe('FileSizePipe', () => {
  let pipeInstance: FileSizePipe;
  let emptySize = '0 Bytes';
  beforeEach(() => {
    pipeInstance = new FileSizePipe();
  });
  it('create an instance', () => {
    expect(pipeInstance).toBeTruthy();
  });
  it(`should return '${emptySize}' for 0 sized input`, () => {
    expect(pipeInstance.transform(0)).toBe(emptySize);
  });
  it(`should return '${emptySize}' for NaN input`, () => {
    expect(pipeInstance.transform(NaN)).toBe(emptySize);
  });
  it(`should return '${emptySize}' for string input`, () => {
    expect(pipeInstance.transform('test' as any)).toBe(emptySize);
  });
  it(`should return '${emptySize}' for boolean false input`, () => {
    expect(pipeInstance.transform(false as any)).toBe(emptySize);
  });
  it(`should return '${emptySize}' for boolean true input`, () => {
    expect(pipeInstance.transform(true as any)).toBe(emptySize);
  });
  for (let i = 1; i <= 10; i++) {
    it(`should return '${i} B' for ${i} byte input`, () => {
      expect(pipeInstance.transform(i)).toBe(`${i} B`);
    });
  }
  it(`should return '1 KB' for 1024 byte input`, () => {
    expect(pipeInstance.transform(1024)).toBe(`1 KB`);
  });
});
