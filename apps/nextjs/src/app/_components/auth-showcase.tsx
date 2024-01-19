import { auth, signIn, signOut } from "@nourish/auth";
import { Button } from "@nourish/ui/button";

export async function AuthShowcase() {
  const session = await auth();

  if (!session) {
    return (
      <form>
        <Button
          size="lg"
          formAction={async () => {
            "use server";
            await signIn("discord");
          }}
        >
          Sign in with Discord
        </Button>
      </form>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 px-4">
      <p className="text-center text-2xl">
        {session && <span>Logged in as {session.user.name}</span>}
      </p>

      <form>
        <Button
          size="lg"
          formAction={async () => {
            "use server";
            await signOut();
          }}
        >
          Sign out
        </Button>
      </form>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ullamcorper morbi
        tincidunt ornare massa eget. Donec adipiscing tristique risus nec
        feugiat. Urna et pharetra pharetra massa massa ultricies mi quis.
        Convallis aenean et tortor at risus viverra adipiscing. Eget sit amet
        tellus cras adipiscing enim. Amet cursus sit amet dictum sit. Neque
        ornare aenean euismod elementum nisi quis eleifend. Non enim praesent
        elementum facilisis leo vel. Felis donec et odio pellentesque diam
        volutpat. Dolor morbi non arcu risus quis varius quam quisque. Varius
        duis at consectetur lorem donec massa sapien faucibus et. Nisl vel
        pretium lectus quam id leo in vitae turpis. Eget arcu dictum varius duis
        at consectetur lorem donec. Aliquam purus sit amet luctus venenatis
        lectus magna. Venenatis lectus magna fringilla urna porttitor rhoncus.
        Et malesuada fames ac turpis. Bibendum ut tristique et egestas quis
        ipsum suspendisse ultrices gravida. Nullam eget felis eget nunc lobortis
        mattis aliquam faucibus. Nulla malesuada pellentesque elit eget gravida
        cum sociis natoque penatibus. Metus dictum at tempor commodo ullamcorper
        a. Ultrices tincidunt arcu non sodales neque sodales. Ut pharetra sit
        amet aliquam id diam maecenas ultricies. Massa tempor nec feugiat nisl
        pretium fusce id. Lacus luctus accumsan tortor posuere. Gravida neque
        convallis a cras semper auctor. Adipiscing vitae proin sagittis nisl
        rhoncus mattis rhoncus urna neque. Odio morbi quis commodo odio aenean
        sed adipiscing. Massa sed elementum tempus egestas sed. Hendrerit dolor
        magna eget est lorem ipsum dolor sit amet. Eget nunc lobortis mattis
        aliquam faucibus purus in. Magna fringilla urna porttitor rhoncus dolor.
        Velit aliquet sagittis id consectetur purus. Pharetra et ultrices neque
        ornare aenean euismod elementum nisi. Massa eget egestas purus viverra
        accumsan in. Sollicitudin ac orci phasellus egestas tellus. Cras ornare
        arcu dui vivamus arcu. Egestas integer eget aliquet nibh. Morbi blandit
        cursus risus at ultrices mi tempus. Volutpat odio facilisis mauris sit.
        Laoreet non curabitur gravida arcu ac tortor. Sit amet cursus sit amet
        dictum. Blandit libero volutpat sed cras ornare arcu dui. Feugiat in
        ante metus dictum at tempor commodo. Tristique et egestas quis ipsum
        suspendisse ultrices gravida. Scelerisque mauris pellentesque pulvinar
        pellentesque habitant morbi tristique. Ante metus dictum at tempor.
        Risus feugiat in ante metus dictum at tempor commodo ullamcorper.
        Pulvinar etiam non quam lacus suspendisse faucibus interdum. Pretium
        nibh ipsum consequat nisl. Interdum varius sit amet mattis vulputate
        enim nulla aliquet. Purus ut faucibus pulvinar elementum. At in tellus
        integer feugiat scelerisque varius morbi enim. At consectetur lorem
        donec massa sapien faucibus et molestie ac. Congue eu consequat ac felis
        donec et odio pellentesque diam. Diam phasellus vestibulum lorem sed
        risus ultricies tristique nulla aliquet. Scelerisque eu ultrices vitae
        auctor eu augue. Pellentesque dignissim enim sit amet. Non pulvinar
        neque laoreet suspendisse. Morbi blandit cursus risus at ultrices mi
        tempus imperdiet. Nibh cras pulvinar mattis nunc sed blandit libero
        volutpat. Faucibus scelerisque eleifend donec pretium vulputate sapien
        nec sagittis aliquam. Consectetur adipiscing elit ut aliquam purus sit
        amet. Semper risus in hendrerit gravida rutrum. Sapien et ligula
        ullamcorper malesuada proin libero nunc consequat interdum. Purus semper
        eget duis at tellus at urna. Maecenas sed enim ut sem viverra.
        Sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum.
        Orci dapibus ultrices in iaculis nunc sed augue lacus. Sed felis eget
        velit aliquet sagittis id consectetur purus ut.
      </p>
    </div>
  );
}
