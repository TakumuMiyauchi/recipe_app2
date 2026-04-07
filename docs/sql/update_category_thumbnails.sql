-- カテゴリーサムネイル画像パスの更新
-- FE/public/thumbnail_images/ に配置したSVGファイルのパスをDBに反映する
-- 実行対象DB: recipeApp_Dev

UPDATE categories SET thumbnail_path = '/thumbnail_images/yasai.svg'    WHERE category_name = '野菜';
UPDATE categories SET thumbnail_path = '/thumbnail_images/oniku.svg'    WHERE category_name = 'お肉';
UPDATE categories SET thumbnail_path = '/thumbnail_images/gyokai.svg'   WHERE category_name = '魚介';
UPDATE categories SET thumbnail_path = '/thumbnail_images/tamago.svg'   WHERE category_name = '玉子';
UPDATE categories SET thumbnail_path = '/thumbnail_images/salada.svg'   WHERE category_name = 'サラダ';
UPDATE categories SET thumbnail_path = '/thumbnail_images/soup.svg'     WHERE category_name = 'スープ';
UPDATE categories SET thumbnail_path = '/thumbnail_images/gohanmono.svg' WHERE category_name = 'ごはんもの';
UPDATE categories SET thumbnail_path = '/thumbnail_images/menrui.svg'   WHERE category_name = '麺類';
UPDATE categories SET thumbnail_path = '/thumbnail_images/okashi.svg'   WHERE category_name = 'お菓子';
UPDATE categories SET thumbnail_path = '/thumbnail_images/chuuka.svg'   WHERE category_name = '中華';
