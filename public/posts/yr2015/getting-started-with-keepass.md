I've been using KeePass for a while now; well over a year. It's been an excellent tool for me. Recently, I've shared this software with several people, which prompted me to put together some thoughts around how to get started with KeePass.

> KeePass is a free open source password manager, which helps you to manage your passwords in a secure way. You can put all your passwords in one database, which is locked with one master key or a key file. So you only have to remember one single master password or select the key file to unlock the whole database. The databases are encrypted using the best and most secure encryption algorithms currently known (AES and Twofish).

To learn about KeePass in detail, you can read [everything they have to say](http://keepass.info/index.html) about their software. I'm just going to go over a few highlights below.

One of the reasons I chose KeePass over other services is because it is not in the cloud. I wanted my password database to be on my hard drive, not in the cloud somewhere. The sad truth is that any site can be hacked. Even the most secure sites can be hacked. For example, [LastPass was hacked](http://lifehacker.com/lastpass-hacked-time-to-change-your-master-password-1711463571) just a few months ago. For that reason, I want to keep my database on my drives, not in the cloud.

Another feature that was important to me was that I'd be able to use it anywhere. KeePass fits the bill. The desktop software will run on Windows, Mac, and Linux. There are also apps for Android, iOS, Windows Phone, etc. Desktop apps can be downloaded [here](http://keepass.info/download.html). There are a couple Android apps, and I've been using [KeePass2Android](https://play.google.com/store/apps/details?id=keepass2android.keepass2android_nonet). It has worked great for me. As an aside, I use [FTPServer](https://play.google.com/store/apps/details?id=lutey.FTPServer) in conjunction with [FileZilla](https://filezilla-project.org/) to transfer files to and from my phone, including my passwords database.

I love the fact that the KeePass desktop software has the ability to run as a portable executable, so installing the software is not necessary. This makes it so that you can run the software anywhere, and keep your settings in one place too. It's easy to have a copy of KeePass on a jump drive to carry with you. Some people also store their password database, and perhaps the portable executable as well, using their cloud storage provider, such as [MEGA](https://mega.nz/), which also makes using your passwords anywhere possible. Just keep in mind that a database stored in the cloud runs the risk of potentially getting stolen by hackers, so take all the security measures you can if you decide to go this route.

There are several little features that I have found make KeePass pleasant to use: random password generation, configurable password generator settings, open the last used database, keyboard shortcuts, url opening shortcuts, etc. Depending on how you intend to use it, some of these features will probably be more useful to you than others.

For me, what makes using KeePass truly a joy is the auto type functionality. KeePass can type much faster than I can, so now my passwords are not only unique and random, but I can get logged in faster than I used to be able to. In the settings dialog, there are options for automatic auto-type wiring. I used this at first, but as I added more and more entries to my database, conflicts started occurring more often, requiring me to choose which of the entries I wanted to auto-type. Consequently, I turned off the auto-wiring for auto-type in the settings dialog and I now add auto-type manually for the entries as I add them. That way, only the entries I want to have auto-type do.

Here are a few highlights of commonly used operations in the KeePass desktop software.

* __Create a new entry__ - Select the folder that you want to store the entry in and then right click in some empty space in the folder contents area. Select the option to add a new entry from the context menu.
* __Edit an existing entry__ - Double click on the entry.
* __Find an entry__ - Hit CTRL + F within the software. The find dialog will appear.
* __Open an entry's url__ - Select the entry and then hit CTRL + U. Alternatively, you can right click on the entry and open the url using the context menu.
* __Copy the user name of an entry__ - Select the entry and hit CTRL + B. Alternatively, right click on the entry and select the option from the context menu to copy the username.
* __Copy the password of an entry__ - Select the entry and hit CTRL + C. Alternatively, right click on the entry and select the option from the context menu to copy the password.
* __Auto type for an entry__ - In the browser window, ensure that the cursor in the username field, then hit CTRL + ALT + A

The most common workflow that I use is as follows:

1. CTRL + F
2. Type in keyword for desired entry then hit enter.
3. Ensure desired entry is selected. Use arrow keys to change selection if needed.
4. CTRL + U
5. CTRL + ALT + A

If you're up for opening and modifying your `KeePass.config.xml` file, here are a few snippets from my config that are my preferred settings:

Show expired or soon to expire entries when the software opens; auto save when the software closes:

```xml
<FileOpening>
	<ShowExpiredEntries>true</ShowExpiredEntries>
	<ShowSoonToExpireEntries>true</ShowSoonToExpireEntries>
</FileOpening>
<FileClosing>
	<AutoSave>true</AutoSave>
</FileClosing>
```

I use the longest password with as many characters as the application I'm setting the password for will allow. My custom random password generating presets:

```xml
<PasswordGenerator>
	<AutoGeneratedPasswordsProfile>
		<GeneratorType>CharSet</GeneratorType>
		<Length>20</Length>
		<CharSetRanges>ULD_______</CharSetRanges>
	</AutoGeneratedPasswordsProfile>
	<LastUsedProfile>
		<Name>(Custom)</Name>
		<GeneratorType>CharSet</GeneratorType>
		<Length>20</Length>
		<CharSetRanges>ULDS_mu___</CharSetRanges>
	</LastUsedProfile>
	<UserProfiles>
		<Profile>
			<Name>16 Chars</Name>
			<GeneratorType>CharSet</GeneratorType>
			<Length>16</Length>
			<CharSetRanges>ULD_______</CharSetRanges>
		</Profile>
		<Profile>
			<Name>16 Chars with Special</Name>
			<GeneratorType>CharSet</GeneratorType>
			<Length>16</Length>
			<CharSetRanges>ULDS_mu___</CharSetRanges>
		</Profile>
		<Profile>
			<Name>20 Chars</Name>
			<GeneratorType>CharSet</GeneratorType>
			<Length>20</Length>
			<CharSetRanges>ULD_______</CharSetRanges>
		</Profile>
		<Profile>
			<Name>20 Chars with Special</Name>
			<GeneratorType>CharSet</GeneratorType>
			<Length>20</Length>
			<CharSetRanges>ULDS_mu___</CharSetRanges>
		</Profile>
		<Profile>
			<Name>30 Chars with Special</Name>
			<GeneratorType>CharSet</GeneratorType>
			<Length>30</Length>
			<CharSetRanges>ULDS_mu_B_</CharSetRanges>
		</Profile>
		<Profile>
			<Name>32 Chars</Name>
			<GeneratorType>CharSet</GeneratorType>
			<Length>32</Length>
			<CharSetRanges>ULD_______</CharSetRanges>
		</Profile>
		<Profile>
			<Name>32 Chars with Special</Name>
			<GeneratorType>CharSet</GeneratorType>
			<Length>32</Length>
			<CharSetRanges>ULDS_mu___</CharSetRanges>
		</Profile>
	</UserProfiles>
</PasswordGenerator>
```

For complete documentation on what KeePass can do, check out the features and docs at http://keepass.info/
