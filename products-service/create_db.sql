CREATE TABLE products (
    id uuid PRIMARY KEY UNIQUE,
    title text,
    description text,
    price numeric
);

CREATE UNIQUE INDEX products_pkey ON products(id uuid_ops);
CREATE UNIQUE INDEX products_id_key ON products(id uuid_ops);

CREATE TABLE counts (
    id uuid PRIMARY KEY,
    "productId" uuid,
    count integer
);

CREATE UNIQUE INDEX counts_pkey ON counts(id uuid_ops);

INSERT INTO "public"."products"("id","title","description","price")
VALUES
(E'026c11da-7431-42de-9d3c-86b31469b366',E'Chaos Space Marine Raptors',E'Жестокие штурмовые войска, известные, как Рапторы (Raptors), считаю себя элитой среди Космических Десантников Хаоса. Их истребительные отряды олицетворяют собой то, что стало с Штурмовыми Десантниками (Assault Marines) легионов предателей.',2442),
(E'12ae922c-61c0-48c1-b31d-6b4b5d9f5995',E'Space Marine Bike Squad',E'Командиры обычно посылают мотоциклистов выполнять те боевые задачи, где требуется в первую очередь скорость. Идеальная тактика Мотоциклетного Отряда Космодесанта – налететь на противника, сбить его с толку, нанести серьезный урон и постараться оказаться вне досягаемости врага, пока он не успел прийти в себя и нанести ответный удар. Во время атаки мотоциклист и его верная машина сливаются в единое целое.',2442),
(E'65fe70aa-3656-43c3-8c1d-ffe589255263',E'Space Marine Assault Squad',E'Обрушиваясь с небес со скоростью молнии и невероятной яростью, Штурмовое отделение Космодесантников (Space Marines Assault Squad) мало кому уступает в боевом неистовстве. Исполненные решимости, бойцы отряда бросаются вперёд и поливают врага бессчётными залпами болтерного огня, набрасываясь и терзая всех уцелевших своими цепными мечами. Прижимая неприятеля к земле и буквально давя его своей тяжёлой бронёй, они жестоко крушат черепа неверных.',2930),
(E'90498cb4-22fb-48ba-a573-a2e8cebead37',E'Chaos Space Marine Terminators',E'Терминаторы Хаоса (Chaos Terminators) – это тяжелобронированные ветераны, снаряжённые в тактические доспехи дредноута образца "Индомитус". Они формируют элитные соединения своих легионов и боевых банд. Несмотря на то, что они более тяжеловесные и громоздкие по сравнению с воинами в силовых доспехах, остановить их сможет разве что прямое попадание противотанкового лазера, и то, только на ближней дистанции. Их шипастые доспехи увешаны мрачными трофеями прошедших битв. Черепа являются варварскими свидетельствами мастерства воина, носящего их. Шлемы превратились в звериные оскалы, из которых произрастают огромные клыки, бритвенные рога и толстые бивни, многие из которых слились с черепом владельца.',3148);

INSERT INTO "public"."counts"("id","productId","count")
VALUES
(E'57afee52-696b-4fd7-b057-4ef9eaf399da',E'12ae922c-61c0-48c1-b31d-6b4b5d9f5995',1),
(E'835b8cb3-e610-463c-a827-1b391a6ed045',E'65fe70aa-3656-43c3-8c1d-ffe589255263',2),
(E'8617db42-9c88-4b20-b788-42dc9a61b6c7',E'026c11da-7431-42de-9d3c-86b31469b366',3),
(E'd41ea4e1-222a-4275-a5a1-034b6c4da1ee',E'90498cb4-22fb-48ba-a573-a2e8cebead37',4);