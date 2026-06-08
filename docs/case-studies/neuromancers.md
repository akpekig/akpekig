# Neuromancers — Mutual Aid Financial Platform for Non-Profit

<div class="flex flex-wrap gap-1 my-2">
<div class="badge badge-warning mb-4">Django</div>
<div class="badge badge-warning mb-4">Wagtail CMS</div>
<div class="badge badge-warning mb-4">Stripe</div>
<div class="badge badge-warning mb-4">Whereby</div>
<div class="badge badge-warning mb-4">GetPronto</div>
<div class="badge badge-warning mb-4">PostgreSQL</div>
<div class="badge badge-warning mb-4">Django Signals</div>
</div>

## Problem

A grassroots mental health organisation needed a secure financial platform to facilitate transactions between certified peers and support seekers, with session management, permissions, and automated notifications. The non-profit had no existing UI/UX patterns and a limited budget.

## Outcome

Delivered a complete, maintainable platform at minimal cost. Implemented a fine-grained permission system using Django signals that automatically assigns and removes object-level permissions when sessions are published or unpublished. Notifications inform hosts of visibility changes, while support seekers see only available sessions. The system was built for easy handover to future maintainers.

## Code Sample — Permission management via Django signals

```python
@receiver(post_save, sender=PeerSession)
def set_peersession_permissions(sender, instance, created, **kwargs):
    if created:
        host = instance.host
        host_perms = ['view_peersession', 'change_peersession', ...]
        for perm in host_perms:
            assign_perm(perm, host, instance)

        support_seeker_group = UserGroup.objects.get(name="Support Seeker")
        peer_group = UserGroup.objects.get(name="Peer")
        neuromancer_group = UserGroup.objects.get(name="Neuromancer")

        seeker_perms = ['view_peersession']

        for group in [support_seeker_group, peer_group, neuromancer_group]:
            if instance.is_published:
                for perm in seeker_perms:
                    assign_perm(perm, group, instance)
                notify_session_published(instance)
            else:
                for perm in seeker_perms:
                    remove_perm(perm, group, instance)
```
