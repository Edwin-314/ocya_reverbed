const {test,expect}=require('@playwright/test');
test('draft lifecycle, escaping, search and persistence',async({page})=>{
 await page.goto('/');await page.locator('[data-new]').click();
 await page.getByLabel('Post title').fill('<img src=x onerror=alert(1)>');await page.getByLabel('Caption',{exact:true}).fill('A real draft');await page.getByRole('button',{name:'Save draft'}).click();
 await page.getByRole('button',{name:'Content library',exact:false}).click();await expect(page.getByRole('heading',{name:'<img src=x onerror=alert(1)>'})).toBeVisible();
 await page.reload();await page.getByRole('button',{name:'Content library',exact:false}).click();await expect(page.getByText('A real draft')).toBeVisible();
 await page.getByRole('button',{name:'Edit post'}).click();await page.getByLabel('Post title').fill('Edited draft');await page.getByRole('button',{name:'Save draft'}).click();
 await page.getByRole('textbox',{name:'Search content'}).fill('missing');await expect(page.getByText('Start with a little idea.')).toBeVisible();await page.getByRole('textbox',{name:'Search content'}).fill('Edited');
 page.once('dialog',d=>d.accept());await page.getByRole('button',{name:'Delete',exact:true}).click();await expect(page.getByRole('heading',{name:'Edited draft'})).toHaveCount(0);
});
test('schedule validation and calendar filter',async({page})=>{
 await page.goto('/');await page.locator('[data-new]').click();await page.getByLabel('Post title').fill('Calendar test');await page.getByLabel('Caption',{exact:true}).fill('Scheduled caption');await page.getByRole('button',{name:'Schedule post'}).click();await expect(page.getByRole('alert')).toContainText('future date');
 const d=new Date();d.setDate(d.getDate()+1);d.setHours(12,0,0,0);const date=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}T12:00`;await page.getByLabel('Schedule',{exact:true}).fill(date);await page.getByRole('button',{name:'Schedule post'}).click();await expect(page.locator('.calendar-post')).toContainText('Calendar test');await page.getByLabel('Filter by network').selectOption('LinkedIn');await expect(page.locator('.calendar-post')).toHaveCount(0);
});
test('brand settings and campaign drafts',async({page})=>{
 await page.goto('/');await page.getByRole('button',{name:'Brand settings',exact:false}).click();await page.getByLabel('Brand name').fill('Test brand');await page.getByRole('button',{name:'Save brand'}).click();await expect(page.locator('#brandLabel')).toHaveText('Test brand');await page.getByRole('button',{name:'Campaigns',exact:false}).click();await page.getByLabel('Campaign topic').fill('Coffee');await page.getByLabel('Number of drafts').fill('3');await page.getByRole('button',{name:'Create campaign drafts'}).click();await expect(page.locator('.post-card')).toHaveCount(3);
});
test('mobile layout fits viewport',async({page})=>{await page.setViewportSize({width:390,height:844});await page.goto('/');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy()});
