UPDATE public."users-permissions_permission" SET enabled = 't' WHERE type='application' AND controller='category' AND action='find' and role=2;
UPDATE public."users-permissions_permission" SET enabled = 't' WHERE type='application' AND controller='category' AND action='findone' and role=2;
UPDATE public."users-permissions_permission" SET enabled = 't' WHERE type='application' AND controller='article' AND action='find' and role=2;
UPDATE public."users-permissions_permission" SET enabled = 't' WHERE type='application' AND controller='article' AND action='findone' and role=2;
