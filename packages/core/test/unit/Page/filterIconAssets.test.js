const { Page } = require('../../../src/Page/index')
const { isNullOrUndefined } = require('util');
const { PageConfig } = require('../../../src/Page/PageConfig');

jest.mock('../../../src/Page/PageConfig', () => {
  return {
    PageConfig: jest.fn().mockImplementation(() => {
      // You can customize the behavior of the mock constructor here
      return {
        asset: {
          fontAwesome: 'mock-fontawesome.css',
          glyphicons: 'mock-glyphicons.css',
          octicons: 'mock-octicons.css',
          materialIcons: 'mock-materialIcons.css',
        }
      };
    }),
  };
});

test('should filter out all but font-awesome stylesheet', () => {
  const mockPageConfig = new PageConfig();
  const mockPage = new Page(mockPageConfig, null);

  mockPage.filterIconAssets('<div><span class="fa-solid"></span></div>');

  expect(mockPage.asset.fontAwesome).toBeDefined();
  expect(mockPage.asset.glyphicons).toBeUndefined();
  expect(mockPage.asset.octicons).toBeUndefined();
  expect(mockPage.asset.materialIcons).toBeUndefined();
});

test('should filter out all but glyphicon stylesheet', () => {
  const mockPageConfig = new PageConfig();
  const mockPage = new Page(mockPageConfig, null);

  mockPage.filterIconAssets('<div><span class="glyphicon glyphicon-alert"></span></div>');

  expect(mockPage.asset.glyphicons).toBeDefined();
  expect(mockPage.asset.fontAwesome).toBeUndefined();
  expect(mockPage.asset.octicons).toBeUndefined();
  expect(mockPage.asset.materialIcons).toBeUndefined();
});

test('should filter out all but octicon stylesheet', () => {
  const mockPageConfig = new PageConfig();
  const mockPage = new Page(mockPageConfig, null);

  mockPage.filterIconAssets('<div><span class="octicon octicon-git-pull-request"></span></div>');

  expect(mockPage.asset.octicons).toBeDefined();
  expect(mockPage.asset.fontAwesome).toBeUndefined();
  expect(mockPage.asset.glyphicons).toBeUndefined();
  expect(mockPage.asset.materialIcons).toBeUndefined();
});

test('should filter out all but material-icons stylesheet', () => {
  const mockPageConfig = new PageConfig();
  const mockPage = new Page(mockPageConfig, null);

  mockPage.filterIconAssets('<div><span class="material-icons-round"></span></div>');

  expect(mockPage.asset.materialIcons).toBeDefined();
  expect(mockPage.asset.fontAwesome).toBeUndefined();
  expect(mockPage.asset.glyphicons).toBeUndefined();
  expect(mockPage.asset.octicons).toBeUndefined();
});

test('should filter out all stylesheets', () => {
  const mockPageConfig = new PageConfig();
  const mockPage = new Page(mockPageConfig, null);

  mockPage.filterIconAssets('<div></div>');

  expect(mockPage.asset.materialIcons).toBeUndefined();
  expect(mockPage.asset.fontAwesome).toBeUndefined();
  expect(mockPage.asset.glyphicons).toBeUndefined();
  expect(mockPage.asset.octicons).toBeUndefined();
});
