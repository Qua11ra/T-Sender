import { testWithSynpress } from '@synthetixio/synpress';
import { metaMaskFixtures } from '@synthetixio/synpress/playwright';
import basicSetup from '../wallet-setup/basic.setup';
import { MetaMask } from '@synthetixio/synpress/cypress';

const test = testWithSynpress(metaMaskFixtures(basicSetup))
const { expect } = test;

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/TSender/);
});

test('should show the airdrop form when connected, else not', async ({ page, context, metamaskPage, extensionId }) => {
  await page.goto('/');
  await expect(page.getByText("Please connect a wallet")).toBeVisible();

  const metamask = new MetaMask(context, metamaskPage, extensionId);
  
  await page.getByTestId('rk-connect-button').click()

  await page.getByTestId('rk-connect-option-io.metamask').waitFor({
    state: 'visible',
    timeout: 30000
  })

  await page.getByTestId('rk-connect-option-io.metamask').click()
  
  const customNetwork = [
    'Anvil',
    'http://127.0.0.1:8545',
    '31337',
    'ETH'
  ]
  await metamask.connectToDapp(customNetwork);

  await expect(page.getByText('Token Address')).toBeVisible()
})
