CREATE SCHEMA IF NOT EXISTS public;


CREATE TABLE public.projects (
  id varchar(500) PRIMARY KEY,
  title varchar(500) NOT NULL,
  description text,
  created_by varchar(500) NOT NULL,
  created_at timestamp NOT NULL,
  updated_at timestamp NOT NULL,
  updated_by varchar(500) NOT NULL
);

COMMENT ON COLUMN public.projects.created_by IS 'связь с таблицами пользователей';

CREATE TABLE public.project_id records (
  id varchar(500) PRIMARY KEY,
  content text,
  created_by varchar(500) NOT NULL,
  created_at timestamp NOT NULL,
  updated_by varchar(500) NOT NULL,
  updated_at timestamp NOT NULL
);

COMMENT ON TABLE public.project_id records IS 'Под каждый проект отдельная таблица с данными, иначе будет одна невменяемо огромная таблица';
COMMENT ON COLUMN public.project_id records.created_by IS 'связь с таблицами пользователей';
COMMENT ON COLUMN public.project_id records.updated_by IS 'связь с таблицами пользователей';

CREATE TABLE public.project's fields (
  id varchar(500) NOT NULL PRIMARY KEY,
  project_id varchar(500) NOT NULL,
  field_type varchar NOT NULL,
  description text,
  title text NOT NULL,
  created_at timestamp NOT NULL,
  updated_at timestamp NOT NULL,
  updated_by varchar(500) NOT NULL,
  created_by varchar(500) NOT NULL
);

COMMENT ON COLUMN public.project's fields.field_type IS 'типы как и в БД, но и поддержка кастомных для абстракции от конкретной БД';
COMMENT ON COLUMN public.project's fields.updated_by IS 'связь с таблицами пользователей';
COMMENT ON COLUMN public.project's fields.created_by IS 'связь с таблицами пользователей';

CREATE TABLE public.table views (
  id bigint NOT NULL PRIMARY KEY,
  project_id varchar(500) NOT NULL,
  settings jsonb,
  filters jsonb,
  groups jsonb,
  type varchar NOT NULL,
  title text NOT NULL,
  description text,
  created_by varchar(500) NOT NULL,
  created_at timestamp NOT NULL,
  updated_at timestamp NOT NULL,
  updated_by varchar(500) NOT NULL
);

COMMENT ON TABLE public.table views IS 'Щас тут всё в json, потому что на этом этапе я уже не знаю как в деталях всё должно быть. В перспективе, возможно, каждый доступный для создания вид - это отдельная таблица, чтобы не плодить JSON в реляционных таблицах.';
COMMENT ON COLUMN public.table views.created_by IS 'связь с таблицами пользователей';
COMMENT ON COLUMN public.table views.updated_by IS 'связь с таблицами пользователей';

ALTER TABLE public.table views ADD CONSTRAINT table views_project_id_fk FOREIGN KEY (project_id) REFERENCES public.projects (id);
ALTER TABLE public.projects ADD CONSTRAINT projects_id_fk FOREIGN KEY (id) REFERENCES public.project's fields (project_id);